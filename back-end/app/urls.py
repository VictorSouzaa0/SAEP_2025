from django.urls import path
from .views import *
urlpatterns = [
    path('',Home.as_view()),
    path('products/',ProductListView.as_view(), name="products"),
    path("products/<int:pk>/", ProductDetailView.as_view(),name="products")
]