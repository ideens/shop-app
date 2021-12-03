from backend.main_app.views import ProductsListView
from rest_framework import serializers
from reviews.serializers import ReviewSerializer, PopulatedReviewSerializer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
