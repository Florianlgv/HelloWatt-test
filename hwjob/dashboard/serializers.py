from rest_framework import serializers
from .models import Client, Consumption, ElectricityPrice


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"


class ConsumptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consumption
        fields = "__all__"


class ElectricityPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElectricityPrice
        fields = "__all__"
