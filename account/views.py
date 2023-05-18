from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from .serializers import SignUpReatalorSerializer, SignUpAdministratorSerializer, SignUpHouseOwnerSerializer, SignUpTenantSerializer, AccountSerializer, HouseOwnerSerializer, TenantSerializer
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes, APIView
#  importing models
from .models import UserAccount, Tenant, HouseOwner, Realtor, Administrator

from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .permissions import IsAdmin, IsRealtor, IsHouseOwner, IsTenant
from rest_framework import generics
#

from django.core.mail import send_mail
# from django.core.mail import EmailMessage
from config.settings.settings import EMAIL_HOST_USER
from house.models import House
from house.serializers import LandlordHouseSerializer
# view for registering users


class SignUpRealtor(generics.CreateAPIView):
    serializer_class = SignUpReatalorSerializer

    def post(self, request: Request):
        data = request.data
        serializer = self.serializer_class(data=data)
        
        if serializer.is_valid():
            # EMAIL SETTING
            subject = 'Interested Company'
            message = "Dear, " + data['first_name'] + " " + data['last_name'] + " representing " + \
                data['company_name'] + ". " \
                    + "Thanks for showing your interest with us, we will exchange with you and proceed." + \
                " " + "Your password is: " + data['password']

            email = data['email']
            recipient_list = [email]

            send_mail(
                subject,
                message,
                EMAIL_HOST_USER,
                recipient_list,
                fail_silently=True)

            # END OF SETTING
            print('User Email: ', email)
            print('Company Message: ', message)
            # print('Company Name: ', data['com'])

            serializer.save()
            response = {
                "message": "User created Successfully",
                "data": serializer.data,
            }

            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignUpAdministrator(generics.CreateAPIView):
    serializer_class = SignUpAdministratorSerializer

    def post(self, request: Request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():

            subject = 'Aministrator Account Creation'
            message = "Dear Landlord," + " " + \
                data['firt_name'] + " " + data['last_name'] + ". " + \
                "Your account to use this service has been created" + \
                " " + "Your password is: " + data['password']

            email = data['email']
            recipient_list = [email]

            send_mail(
                subject,
                message,
                EMAIL_HOST_USER,
                recipient_list,
                fail_silently=True)
            
            print('User Email: ', email)
            print('Company Message: ', message)
            
            serializer.save()
            response = {
                "message": "User created Successfully",
                "data": serializer.data
            }

            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignUpTenant(generics.CreateAPIView):
    serializer_class = SignUpTenantSerializer

    def post(self, request: Request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():

            subject = 'Tenant Account Creation'
            message = "Dear Landlord," + " " + \
                data['firt_name'] + " " + data['last_name'] + ". " + \
                "Your account to use this service has been created" + \
                " " + "Your password is: " + data['password']

            email = data['email']
            recipient_list = [email]

            send_mail(
                subject,
                message,
                EMAIL_HOST_USER,
                recipient_list,
                fail_silently=True)

            serializer.save()
            response = {
                "message": "User created Successfully",
                "data": serializer.data
            }

            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignUpHouseOwner(generics.CreateAPIView):
    serializer_class = SignUpHouseOwnerSerializer

    def post(self, request: Request):
        data = request.data
        serializer = self.serializer_class(data=data)
        print(serializer)
        if serializer.is_valid():

            subject = 'Landlord Account Creation'
            message = "Dear Landlord," + " " + \
                data['firt_name'] + " " + data['last_name'] + ". " + \
                "Your account to use this service has been created" + \
                " " + "Your password is: " + data['password']

            email = data['email']
            recipient_list = [email]

            send_mail(
                subject,
                message,
                EMAIL_HOST_USER,
                recipient_list,
                fail_silently=True)
            
            print('User Email: ', email)
            print('Company Message: ', message)

            serializer.save()
            response = {
                "message": "User created Successfully",
                "data": serializer.data
            }

            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def allUsers(request):
    # Querying Employees table/model
    users = UserAccount.objects.all()
    # Converting the Employees query into json
    serializer = AccountSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, IsAdmin])
def realtor(request, pk):
    try:
        data = Realtor.objects.get(id=pk)
    except Realtor.DoesNotExist:
        return Response(status=status.HTTP_200_OK)

    if request.method == 'GET':
        serialiazer = AccountSerializer(data)
        return Response({'Realtor': serialiazer.data}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

    elif request.method == 'PUT':
        serialiazer = AccountSerializer(data, data=request.data)
        if serialiazer.is_valid():
            serialiazer.save()
            return Response({'tenant': serialiazer.data}, status=status.HTTP_200_OK)
        return Response(serialiazer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def allTenant(request):
    # Querying Employees table/model
    tenants = Tenant.objects.all()
    # Converting the query into json
    serializer = AccountSerializer(tenants, many=True)
    return Response(serializer.data)


class UsersList(generics.ListCreateAPIView):
    permission_classes = [IsAdminUser]
    queryset = UserAccount.objects.all()
    serializer_class = AccountSerializer


class MyHouse(generics.ListAPIView):
    permission_classes = [IsTenant]  # Custom permission class used~~
    #  ~IsAdmin, ~IsTenant, ~IsHouseOwner
    queryset = Tenant.objects.all()
    serializer_class = AccountSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)
        return Tenant.objects.filter(email=user)
    
class LandlordHouses(generics.ListAPIView):
    permission_classes = [IsHouseOwner]  # Custom permission class used~~
    #  ~IsAdmin, ~IsTenant, ~IsHouseOwner
    queryset = House.objects.all()
    serializer_class = LandlordHouseSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)
        return House.objects.filter(houseOwner=user)


class AgentCreatedUsers(generics.ListAPIView):
    permission_classes = [IsRealtor]  # Custom permission class used~~
    #  ~IsAdmin, ~IsTenant, ~IsHouseOwner

    queryset = Tenant.objects.all()
    serializer_class = AccountSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)
        return UserAccount.objects.filter(registered_by=user)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def allHouseOwners(request):
    landlords = HouseOwner.objects.all()
    # Converting the Employees query into json
    serializer = AccountSerializer(landlords, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def allRealtors(request):
    realtors = Realtor.objects.all()
    # Converting the Employees query into json
    serializer = AccountSerializer(realtors, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def allAdministators(request):
    administrators = Administrator.objects.all()
    # Converting the Employees query into json
    serializer = AccountSerializer(administrators, many=True)
    return Response(serializer.data)


class MyLandlords(generics.ListAPIView):
    permission_classes = [IsRealtor]  # Custom permission class used~~

    queryset = HouseOwner.objects.all()
    serializer_class = AccountSerializer

    def get_queryset(self):
        user = self.request.user
        return HouseOwner.objects.filter(registered_by=user)


class LandLordagent(generics.ListAPIView):
    permission_classes = [IsHouseOwner
                          #   , ~IsRealtor, ~IsAdmin, ~IsTenant
                          ]  # Custom permission class used~~

    queryset = HouseOwner.objects.all()
    serializer_class = AccountSerializer

    def get_queryset(self):
        user = self.request.user
        register_by = user.registered_by
        return Realtor.objects.filter(email=register_by)


class tenantAgent(generics.ListAPIView):
    permission_classes = [IsTenant]  # Custom permission class used~~
    # , ~IsRealtor, ~IsAdmin, ~IsHouseOwner IsTenant,
    queryset = Tenant.objects.all()
    serializer_class = AccountSerializer

    def get_queryset(self):
        user = self.request.user
        register_by = user.registered_by
        return Realtor.objects.filter(email=register_by)


@api_view(['GET'])
def anonymousUsers(request):
    routes = [
        'api/token',
        'api/token/refresh'
    ]
    return Response(routes)

# Get Realtor's tenants


class MyTenant(generics.ListAPIView):
    permission_classes = [IsRealtor]  # Custom permission class used~~
    #  ~IsAdmin, ~IsTenant, ~IsHouseOwner
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)
        return Tenant.objects.filter(registered_by=user)

# Get Realtor's single tenant for update and delete

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, IsRealtor, ~IsAdmin])
def realtorTenant(request, pk):
    try:
        data = Tenant.objects.get(id=pk)
    except Tenant.DoesNotExist:
        return Response(status=status.HTTP_200_OK)

    if request.method == 'GET':
        serialiazer = AccountSerializer(data)
        return Response({'Tenant': serialiazer.data}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

    elif request.method == 'PUT':
        serialiazer = AccountSerializer(data, data=request.data)
        if serialiazer.is_valid():
            serialiazer.save()
            return Response({'tenant': serialiazer.data}, status=status.HTTP_200_OK)
        return Response(serialiazer.errors, status=status.HTTP_400_BAD_REQUEST)


# Realtor viewing and saving tenants
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, IsRealtor, ~IsAdmin])
def listTenant(request):

    if request.method == 'GET':

        data = Tenant.objects.all()
        serializer = SignUpTenantSerializer(data, many=True)
        respose = {'message': 'Tenants',
                   'data': serializer.data}
        return Response(data=respose, status=status.HTTP_302_FOUND)

    elif request.method == 'POST':
        serialiazer = SignUpTenantSerializer(data=request.data)
        if serialiazer.is_valid():
            serialiazer.save()

            return Response({'Tenants': serialiazer.data}, status=status.HTTP_202_ACCEPTED)
        return Response(serialiazer.errors, status=status.HTTP_400_BAD_REQUEST)


# Realtor viewing and saving landlords
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, IsRealtor])
def listHouseOwner(request):

    if request.method == 'GET':

        data = HouseOwner.objects.all()
        serializer = SignUpHouseOwnerSerializer(data, many=True)
        respose = {'message': 'House owners',
                   'data': serializer.data}
        return Response(data=respose, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serialiazer = SignUpHouseOwnerSerializer(data=request.data)
        if serialiazer.is_valid():
            serialiazer.save()

            return Response({'House Owner': serialiazer.data}, status=status.HTTP_200_OK)
        return Response(serialiazer.errors, status=status.HTTP_400_BAD_REQUEST)


# Get Realtor's single house owner for update and delete
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, IsRealtor, ~IsAdmin])
def myLandLord(request, pk):
    try:
        data = HouseOwner.objects.get(id=pk)
    except HouseOwner.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serialiazer = AccountSerializer(data)
        return Response({'House Owners': serialiazer.data}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serialiazer = AccountSerializer(data, data=request.data)
        if serialiazer.is_valid():
            serialiazer.save()
            return Response({'house owner': serialiazer.data}, status=status.HTTP_200_OK)
        return Response(serialiazer.errors, status=status.HTTP_400_BAD_REQUEST)
