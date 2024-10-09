from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from . import models, serializers


class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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

    def get_suggested_tracks(self, request, pk=None):
        """
        Get suggested tracks for a specific playlist.
        Excludes tracks that are already in the playlist.
        """
        playlist = self.get_object()  # Get the current playlist
        existing_track_ids = playlist.tracks.values_list('id', flat=True)  # Get IDs of existing tracks

        # Get all tracks excluding the existing ones in the playlist
        suggested_tracks = models.Track.objects.exclude(id__in=existing_track_ids)
        serializer = serializers.TrackSerializer(suggested_tracks, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
