from django.urls import path
from .views import  ProductListCreateView, ProductDetailView, MovementListCreateView

urlpatterns = [

    path('products/', ProductListCreateView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('movements/', MovementListCreateView.as_view(), name='movement-list'),
]