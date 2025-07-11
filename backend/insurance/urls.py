from django.urls import path, include
from insurance.apis import GenerateRecommendationView

urlpatterns = [
    path('generate/', GenerateRecommendationView.as_view(), name='generate-recommendation'),
]
