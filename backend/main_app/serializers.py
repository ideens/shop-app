from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, OrderItem, Order, OrderDelivery
from rest_framework_simplejwt.tokens import RefreshToken


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "name", "isAdmin"]

    def get_name(
        self, obj
    ):  # method to create custom attributes (first+last name as one)
        name = obj.first_name
        if name == "":
            name = obj.email
        return name

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserTokenSerializer(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "name", "isAdmin", "token"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
        # return another token with user obj


class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDelivery
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serialized_orders = OrderItemSerializer(items, many=True)
        return serialized_orders.data

    def get_shippingAddress(self, obj):
        try:
            address = DeliverySerializer(obj.shippingaddress, many=False).data
        except:
            address = False  # currently going here
        return address

    def get_user(self, obj):
        user = obj.user
        serialized_user = UserSerializer(user, many=False)
        return serialized_user.data
