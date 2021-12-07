from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Product
from .serializers import ProductSerializer, UserSerializer, UserTokenSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.


class UserView(APIView):
    def get(self, request):
        user = request.user  # gets user from token, not admin login
        serialized_user = UserSerializer(user, many=False)
        return Response(serialized_user.data)


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
