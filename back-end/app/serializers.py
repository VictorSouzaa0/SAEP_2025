from rest_framework import serializers
from .models import Product, Movement

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class MovementSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    responsible_name = serializers.ReadOnlyField(source='responsible.username')

    class Meta:
        model = Movement
        fields = [
            'id', 
            'product', 
            'product_name', 
            'quantity', 
            'movement_type', 
            'date', 
            'responsible', 
            'responsible_name'
        ]
        read_only_fields = ['date', 'responsible']