from django.urls import path
from . import views
from .views import ProductsListView

urlpatterns = [
    path("products/", ProductsListView.as_view()),
]
