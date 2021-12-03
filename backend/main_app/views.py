from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Product
from .serializers import ProductSerializer

# Create your views here.


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
