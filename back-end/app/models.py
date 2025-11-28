from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True) 
    price = models.DecimalField(max_digits=10, decimal_places=2) 
    quantity = models.IntegerField(default=0) 
    min_stock = models.IntegerField(default=0) 
    material = models.CharField(max_length=255, blank=True)
    type = models.CharField(max_length=255, blank=True) 

    def __str__(self):
        return self.name

class Movement(models.Model):
    MOVEMENT_TYPES = [
        ('ENTRY', 'Entrada'),
        ('EXIT', 'Saída'),
    ]
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='movements')
    movement_type = models.CharField(max_length=10, choices=MOVEMENT_TYPES)
    quantity = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    responsible = models.ForeignKey(User, on_delete=models.CASCADE) 

    def __str__(self):
        return f"{self.movement_type} - {self.product.name} - {self.quantity}"