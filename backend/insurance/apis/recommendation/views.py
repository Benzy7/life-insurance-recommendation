from rest_framework import status, permissions
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.db import transaction
from .serializers import RecommendationInputSerializer
from insurance.services.recommendation import generate_recommendation
from core.utils.logger import exception_log

class GenerateRecommendationView(APIView):
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'recommendation'
    serializer_class = RecommendationInputSerializer
    permission_classes = [permissions.AllowAny]
    
    @transaction.atomic
    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)

            result = generate_recommendation(serializer.validated_data)
            return Response({"message":'RECOMMENDATIONS_GENERATED_SUCCESSFULLY', "data": result})
        except ValidationError as e:
            transaction.set_rollback(True)
            exception_log(e, __file__)
            return Response({"message": 'VALIDATION_ERROR', "details": e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            transaction.set_rollback(True)
            exception_log(e,__file__)
            return Response({"message": "UNEXPECTED_ERROR_OCCURRED", "details": str(e)}, status=status.HTTP_400_BAD_REQUEST)
