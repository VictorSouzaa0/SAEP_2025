from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication


class Home(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated,IsAdminUser]

    def get(self,request):
        content = {"Message":"Login has sucessfull"}
        return Response(content)