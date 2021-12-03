from django.urls import path
from . import views
from .views import ProductsDetailView, ProductsListView

urlpatterns = [
    path("products/", ProductsListView.as_view()),
    path("products/<int:pk>/", ProductsDetailView.as_view()),
]
