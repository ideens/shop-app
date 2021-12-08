from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from datetime import datetime

from .models import OrderItem, Product, Order, OrderDelivery
from .serializers import (
    ProductSerializer,
    UserSerializer,
    UserTokenSerializer,
    OrderSerializer,
)

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.


class UpdateOrderPaid(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        order = Order.objects.get(_id=pk)
        order.isPaid = True
        order.paidAt = datetime.now
        order.save()
        return Response("paid")


class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = request.user

        try:
            order = Order.objects.get(_id=pk)
            if user.is_staff or order.user == user:
                serialized_order = OrderSerializer(order, many=False)
                return Response(serialized_order.data)
            else:
                Response(
                    {"detail": "Not authorized to view this order"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except:
            return Response(
                {"detail": "Order not found"}, status=status.HTTP_400_BAD_REQUEST
            )


class OrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data
        orderItems = data["orderItems"]
        if orderItems and len(orderItems) == 0:
            return Response(
                {"detail": "No order items"}, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            order = Order.objects.create(
                user=user,
                paymentMethod=data["paymentMethod"],
                totalPrice=data["totalPrice"],
            )
            shipping = OrderDelivery.objects.create(
                order=order,
                address=data["shippingAddress"]["address"],
                city=data["shippingAddress"]["city"],
                postCode=data["shippingAddress"]["postcode"],
                country=data["shippingAddress"]["country"],
            )
            for i in orderItems:
                product = Product.objects.get(_id=i["product"])
                item = OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    quantity=i["quantity"],
                    price=i["price"],
                    image=product.image.url,
                )

            product.stockNum -= int(item.quantity)
            product.save()
        serialized_orders = OrderSerializer(order, many=False)
        return Response(serialized_orders.data)


class RegisterView(APIView):
    def post(self, request):
        data = request.data
        try:
            user = User.objects.create(
                first_name=data["name"],
                username=data["email"],
                email=data["email"],
                password=make_password(data["password"]),
            )

            serialized_register = UserTokenSerializer(user, many=False)
            return Response(serialized_register.data)
        except:
            message = {"detail": "User with this email already exists"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serialized_user = UserTokenSerializer(user, many=False)
        data = request.data
        user.first_name = data["name"]
        user.username = data["email"]
        user.email = data["email"]
        if data["password"] != "":
            user.password = make_password(data["password"])
        user.save()
        return Response(serialized_user.data)


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user  # gets user from token, not admin login
        serialized_user = UserSerializer(user, many=False)
        return Response(serialized_user.data)


class UserListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serialized_users = UserSerializer(users, many=True)
        return Response(serialized_users.data)


class ProductsDetailView(APIView):
    def get(self, request, pk):
        product = Product.objects.get(_id=pk)
        serialized_product = ProductSerializer(product)
        return Response(serialized_product.data)


class ProductsListView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serialized_products = ProductSerializer(products, many=True)
        return Response(serialized_products.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serialized_token = UserTokenSerializer(self.user).data
        for k, v in serialized_token.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    # class that returns the user data
