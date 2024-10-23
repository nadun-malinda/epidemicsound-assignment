from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from . import models, serializers


class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        exclude_playlist_id = request.query_params.get('exclude_playlist')
        queryset = self.get_queryset()

        if exclude_playlist_id:
            # Exclude tracks that are in the specified playlist
            playlist = models.Playlist.objects.filter(id=exclude_playlist_id).first()
            if playlist:
                queryset = queryset.exclude(id__in=playlist.tracks.values_list('id', flat=True))

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all().order_by('-created_at')
    serializer_class = serializers.PlaylistSerializer
    permission_classes = []

    def update(self, request, *args, **kwargs):
        playlist = self.get_object()  # Get the current playlist
        data = request.data

        # Update name and description if provided
        if 'name' in data:
            playlist.name = data['name']
        if 'description' in data:
            playlist.description = data['description']
        
        # Add new tracks without removing existing ones
        if 'tracks' in data:
            new_tracks = data['tracks']
            for track_id in new_tracks:
                track = models.Track.objects.filter(id=track_id).first()
                if track:
                    playlist.tracks.add(track)

        # Remove tracks if provided
        if 'remove_tracks' in data:
            remove_tracks = data['remove_tracks']
            for track_id in remove_tracks:
                track = models.Track.objects.filter(id=track_id).first()
                if track:
                    playlist.tracks.remove(track)

        playlist.save()  # Save changes to the playlist
        serializer = self.get_serializer(playlist)  # Serialize the updated playlist
        return Response(serializer.data, status=status.HTTP_200_OK)
