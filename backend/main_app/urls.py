from django.urls import path
from . import views
from .views import ProductsDetailView, ProductsListView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)


urlpatterns = [
    path("users/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("products/", ProductsListView.as_view()),
    path("products/<int:pk>/", ProductsDetailView.as_view()),
]
