from rest_framework import serializers
from rest_framework.validators import ValidationError
from account.serializers import AccountSerializer

from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Profile
        fields = '__all__'
        
class ViewProfileSerializer(serializers.ModelSerializer):
    accountOwner = AccountSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'

# class CompanyPartnerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CompanyPartner
#         fields = '__all__'

