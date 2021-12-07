from django.urls import path
from . import views
from .views import ProductsDetailView, ProductsListView, UserView


urlpatterns = [
    path(
        "users/login/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path("products/", ProductsListView.as_view()),
    path("products/<int:pk>/", ProductsDetailView.as_view()),
    path("users/profile/", UserView.as_view(), name="users-profile"),
]
