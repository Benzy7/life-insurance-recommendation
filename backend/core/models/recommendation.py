from django.db import models
from core.models.base import TimestampedModel

class Recommendation(TimestampedModel):
    age = models.IntegerField()
    income = models.DecimalField(max_digits=10, decimal_places=2)
    dependents = models.IntegerField()
    risk = models.CharField(max_length=10)
    plan = models.CharField(max_length=100)
    explanation = models.TextField()
