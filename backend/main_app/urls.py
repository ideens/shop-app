from django.urls import path
from . import views
from .views import (
    OrderDetailView,
    ProductsDetailView,
    ProductsListView,
    UpdateOrderDelivered,
    UpdateOrderPaid,
    UserOrders,
    UserOrdersList,
    UserProfileView,
    UserView,
    UserListView,
    MyTokenObtainPairView,
    RegisterView,
    OrderView,
    DeleteUser,
    DeleteProduct,
    CreateProduct,
    UpdateProduct,
    UploadImage,
    CreateReview,
)


urlpatterns = [
    path("users/login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("users/register/", RegisterView.as_view(), name="register"),
    path("products/", ProductsListView.as_view()),
    path("products/create/", CreateProduct.as_view(), name="create-product"),
    path("products/upload/", UploadImage.as_view(), name="image-upload"),
    path("products/<int:pk>/reviews/", CreateReview.as_view(), name="create-review"),
    path("products/<int:pk>/", ProductsDetailView.as_view()),
    path("products/update/<int:pk>/", UpdateProduct.as_view(), name="update-product"),
    path("products/delete/<int:pk>/", DeleteProduct.as_view(), name="delete-product"),
    path("users/profile/", UserView.as_view(), name="users-profile"),
    path(
        "users/profile/update/", UserProfileView.as_view(), name="user-profile-update"
    ),
    path("users/", UserListView.as_view(), name="users"),
    path("users/delete/<str:pk>/", DeleteUser.as_view(), name="delete-user"),
    path("orders/", UserOrdersList.as_view(), name="orders"),
    path("orders/add/", OrderView.as_view(), name="add-order"),
    path("orders/myorders/", UserOrders.as_view(), name="my-orders"),
    path("orders/<str:pk>/", OrderDetailView.as_view(), name="get-order"),
    path("orders/<str:pk>/pay/", UpdateOrderPaid.as_view(), name="pay-order"),
    path(
        "orders/<str:pk>/deliver/", UpdateOrderDelivered.as_view(), name="deliver-order"
    ),
]
