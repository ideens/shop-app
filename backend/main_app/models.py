from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    # image = models.CharField(max_length=200)
    description = models.TextField(max_length=300, null=True, blank=True)
    category = models.CharField(max_length=50, null=True, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    stockNum = models.IntegerField(null=True, blank=True, default=0)
    rating = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
