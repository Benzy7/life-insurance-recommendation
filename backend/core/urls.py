from django.urls import path, include

urlpatterns = [
    path("rec/", include("insurance.urls")),
]
