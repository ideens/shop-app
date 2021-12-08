from django.urls import path
from . import views
from .views import (
    ProductsDetailView,
    ProductsListView,
    UserProfileView,
    UserView,
    UserListView,
    MyTokenObtainPairView,
    RegisterView,
    OrderView,
)


urlpatterns = [
    path("users/login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("users/register/", RegisterView.as_view(), name="register"),
    path("products/", ProductsListView.as_view()),
    path("products/<int:pk>/", ProductsDetailView.as_view()),
    path("users/profile/", UserView.as_view(), name="users-profile"),
    path(
        "users/profile/update/", UserProfileView.as_view(), name="user-profile-update"
    ),
    path("users/", UserListView.as_view(), name="users"),
    path("orders/add/", OrderView.as_view(), name="add-order"),
]
