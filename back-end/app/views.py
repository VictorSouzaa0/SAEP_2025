from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.exceptions import ValidationError
from .models import Product, Movement
from .serializers import ProductSerializer, MovementSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated,IsAdminUser]


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated,IsAdminUser]


class MovementListCreateView(generics.ListCreateAPIView):
    queryset = Movement.objects.all()
    serializer_class = MovementSerializer
    permission_classes = [IsAuthenticated,IsAdminUser]

    def perform_create(self, serializer):
        # 1. Pega os dados enviados pelo Frontend
        product = serializer.validated_data['product']
        qty = serializer.validated_data['quantity']
        tipo = serializer.validated_data['movement_type']

        user = self.request.user

        if tipo == 'EXIT':

            if product.quantity < qty:
                raise ValidationError({"error": "Estoque insuficiente para esta saída."})
            product.quantity -= qty
        else: 
            product.quantity += qty

        product.save()
        serializer.save(responsible=user)