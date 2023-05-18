from rest_framework import serializers
from rest_framework.validators import ValidationError
#
from .models import UserAccount, Tenant, Administrator, HouseOwner, Realtor
from django.conf import settings
# from house.serializers import HouseSerializer

class SignUpAdministratorSerializer(serializers.ModelSerializer):

    email = serializers.CharField(max_length=45)
    password = serializers.CharField(max_length=20, write_only=True)
    first_name = serializers.CharField(max_length=20)
    last_name = serializers.CharField(max_length=50)
    phone_number = serializers.CharField(
        min_length=8, max_length=20, write_only=True)
    gender = serializers.CharField(max_length=15)

    class Meta:
        model = Administrator
        fields = ['id', 'email',  'password',
                  'first_name', 'last_name', 'phone_number', 'gender']

    def validate(self, attrs):
        email_exists = Administrator.objects.filter(
            email=attrs['email']).exists()

        if email_exists:
            raise ValidationError('Email has already been used')

        return super().validate(attrs)

    def create(self, validated_data):
        user = Administrator.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number'],
            gender=validated_data['gender'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class SignUpReatalorSerializer(serializers.ModelSerializer):

    email = serializers.CharField(max_length=50)
    password = serializers.CharField(
        min_length=8, max_length=20, write_only=True)
    first_name = serializers.CharField(max_length=20)
    last_name = serializers.CharField(max_length=50)
    phone_number = serializers.CharField(
        min_length=8, max_length=20, write_only=True)
    company_name = serializers.CharField(max_length=150)
    company_email = serializers.CharField(max_length=50)
    gender = serializers.CharField(max_length=15)
    termsAndConditions = serializers.BooleanField(default=False)

    class Meta:
        model = Realtor
        fields = '__all__'
        fields = ['id', 'email', 'password', 'first_name', 'last_name',
                  'phone_number', 'company_name', 'company_email', 'gender', 'termsAndConditions']

    def validate(self, attrs):
        email_exists = Realtor.objects.filter(email=attrs['email']).exists()
        phone_number_exists = Realtor.objects.filter(
            phone_number=attrs['phone_number']).exists()

        if email_exists:
            raise ValidationError(
                'There is a user  with the same email, please choose another email')
        if phone_number_exists:
            raise ValidationError(
                'There is a user using this phone number, please use your own number.')

        return super().validate(attrs)

    def create(self, validated_data):
        user = Realtor.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number'],
            company_name=validated_data['company_name'],
            company_email=validated_data['company_email'],
            gender=validated_data['gender'],
            termsAndConditions=validated_data['termsAndConditions'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class SignUpTenantSerializer(serializers.ModelSerializer):

    email = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=20, write_only=True)
    first_name = serializers.CharField(max_length=20)
    last_name = serializers.CharField(max_length=50)
    phone_number = serializers.CharField(
        min_length=8, max_length=20, write_only=True)
    registered_by = serializers.CharField(max_length=50)
    houserented = serializers.CharField(max_length=100)
    gender = serializers.CharField(max_length=15)

    class Meta:
        model = Tenant
        fields = ['id', 'email',  'password', 'first_name',
                  'last_name', 'phone_number', 'registered_by', 'houserented', 'gender']

    def validate(self, attrs):
        email_exists = Tenant.objects.filter(email=attrs['email']).exists()

        if email_exists:
            raise ValidationError(
                'This email has already been used for a tenant already')

        return super().validate(attrs)

    def create(self, validated_data):
        user = Tenant.objects.create(

            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number'],
            registered_by=validated_data['registered_by'],
            houserented=validated_data['houserented'],
            gender=validated_data['gender'],

        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class SignUpHouseOwnerSerializer(serializers.ModelSerializer):

    email = serializers.CharField(max_length=50)
    password = serializers.CharField(
        min_length=8, write_only=True)
    first_name = serializers.CharField(max_length=20)
    last_name = serializers.CharField(max_length=50)
    phone_number = serializers.CharField(max_length=20)
    registered_by = serializers.CharField(max_length=50)
    gender = serializers.CharField(max_length=15)

    class Meta:
        model = HouseOwner
        fields = ['id', 'email',  'password', 'first_name',
                  'last_name', 'phone_number', 'registered_by', 'gender']

    def validate(self, attrs):
        email_exists = HouseOwner.objects.filter(email=attrs['email']).exists()

        if email_exists:
            raise ValidationError(
                'This email belongs to another landlord / house owner')

        return super().validate(attrs)

    def create(self, validated_data):
        user = HouseOwner.objects.create(

            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number'],
            registered_by=validated_data['registered_by'],
            gender=validated_data['gender'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'


class TenantSerializer(serializers.ModelSerializer):
    # house = HouseSerializer(read_only=True)
    class Meta:
        model = Tenant
        fields = '__all__'


class HouseOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseOwner
        fields = '__all__'
