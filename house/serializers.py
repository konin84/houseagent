from rest_framework import serializers
from rest_framework.validators import ValidationError

from .models import House, HouseImage, RentPayment
# , TenantHouse
from account.serializers import AccountSerializer

from account.serializers import TenantSerializer

class HouseSerializer(serializers.ModelSerializer):
    # houseOwner = HouseOwnerSerializer()
    class Meta:
        model = House
        fields = '__all__'

class LandlordHouseSerializer(serializers.ModelSerializer):
    tenant = TenantSerializer()
    class Meta:
        model = House
        fields = '__all__'


class RealtorHouseSerializer(serializers.ModelSerializer):
    # houseOwner = HouseOwnerSerializer()
    class Meta:
        model = House
        fields = '__all__'


class ImageSerilizer(serializers.ModelSerializer):
    class Meta:
        model=HouseImage
        fields = '__all__'


class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentPayment
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    tenant = AccountSerializer(read_only=True)
    class Meta:
        model = RentPayment
        fields = '__all__'
