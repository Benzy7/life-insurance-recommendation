from rest_framework import serializers

class RecommendationInputSerializer(serializers.Serializer):
    age = serializers.IntegerField(min_value=0)
    risk = serializers.ChoiceField(choices=["low", "medium", "high"])
    income = serializers.DecimalField(max_digits=10, decimal_places=2)
    dependents = serializers.IntegerField(min_value=0)
