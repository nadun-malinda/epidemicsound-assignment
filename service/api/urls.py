from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"tracks", views.TrackViewSet)
router.register(r"playlists", views.PlaylistViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("playlists/<int:pk>/suggested-tracks/", views.PlaylistViewSet.as_view({'get': 'get_suggested_tracks'}), name='suggested-tracks'),
]
