from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    material = models.CharField(max_length=255)
    height = models.DecimalField(decimal_places=2, max_digits=5)
    size_cm = models.DecimalField(decimal_places=2, max_digits=5)
    IS_USED_CHOICES = {
        "USED":"USED",
        "AVAILABLE":"AVAILABLE"
    }
    useProduct = models.CharField(choices=IS_USED_CHOICES, max_length=10)

    def __str__(self):
        return f"name: {self.name}"