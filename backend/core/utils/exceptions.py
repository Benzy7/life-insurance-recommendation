from rest_framework.views import exception_handler
from rest_framework.exceptions import Throttled

def custom_throttle_exception_handler(exc, context):
    response = exception_handler(exc, context)
    
    if isinstance(exc, Throttled):
        throttle_data = {
            'message': 'RATE_LIMIT_EXCEEDED',
            'details': f'Too many requests. Please slow down and try after {exc.wait} seconds.',
        }
        response.data = throttle_data
    
    return response