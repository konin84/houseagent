from rest_framework import generics,status
from account.permissions import IsRealtor, IsAdmin, IsHouseOwner, IsTenant
from .models import House, HouseImage, RentPayment
from account.models import UserAccount
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .serializers import HouseSerializer, RealtorHouseSerializer, ImageSerilizer, RentSerializer
# , TenantHouseSerializer
from django.db.models import Avg, Sum, Count


@api_view(['GET'])
@permission_classes([IsAuthenticated,IsAdmin])
def Houses(request):
  houses = House.objects.all()
  serializer = HouseSerializer(instance=houses, many=True)

  respose = {
      'message': ' houses',
      'data': serializer.data
  }
  return Response(data=respose, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def TotalBills(request):
  total = RentPayment.objects.all()
  serializer = RentSerializer(instance=total, many=True)
  all_sum = total.aggregate(Sum('amount'))['amount__sum']
# return Response({'sum': all_sum if all_sum else 0 , 'objects': serializer.data})
  respose = {
      'message': 'Total amount paid so far',
      'data': serializer.data,
      'Total': all_sum if all_sum else 0
  }
  return Response(data=respose, status=status.HTTP_200_OK)


# def get_queryset(self):
#           user = self.request.user
#           print(user)
#           return RentPayment.objects.filter(realtor=user )

@api_view(['GET'])
@permission_classes([IsAuthenticated,IsRealtor])
def TotalRealtorBills(request):
#   user = self.request.user 
  total = RentPayment.objects.all()
  serializer = RentSerializer(instance=total, many=True)
  all_sum = total.aggregate(Sum('amount'))['amount__sum']
# return Response({'sum': all_sum if all_sum else 0 , 'objects': serializer.data})
  respose = {
      'message': 'Total amount paid so far',
      'objects': serializer.data,
      'Total': all_sum if all_sum else 0
  }
#  
  return Response(data=respose, status=status.HTTP_200_OK)



class RealtorRegisteredHouses(generics.ListAPIView):
    permission_classes = [IsRealtor, ~IsAdmin]
   #  q = UserAccount.objects.raw('SELECT houserented FROM Tenant')
    queryset = House.objects.all()
   #  for r in q:
   #     print('Address: ',r.address)
       
    serializer_class = RealtorHouseSerializer
    def get_queryset(self):
          user = self.request.user
          print(user)
          return House.objects.filter(realtor=user )
    
class RealtorAssigningHouseToTenant(generics.ListAPIView):
    permission_classes = [IsRealtor, ~IsAdmin]
   #  userdata = Tenant.objects.filter(houserented='')
   #  print('Userdata: ->', userdata)
    queryset = House.objects.all()
    serializer_class = RealtorHouseSerializer
    def get_queryset(self):
          user = self.request.user.id
          print(user)
          return House.objects.filter(realtor=user)




@api_view(['GET','POST'])
@permission_classes([IsAuthenticated, IsRealtor])
def listHouse(request):

  if request.method=='GET':
     data=House.objects.all() 
     serializer = HouseSerializer(data, many=True)
     respose = {'message': 'Houses',
                'data': serializer.data }
     return Response(data=respose, status=status.HTTP_302_FOUND)
  
  elif request.method == 'POST':
    serialiazer = HouseSerializer(data=request.data)
    if serialiazer.is_valid():
      serialiazer.save()
    
      return Response({'house':serialiazer.data}, status=status.HTTP_201_CREATED)
    return Response(serialiazer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
# @permission_classes([IsAuthenticated, IsRealtor])
def images(request):

  if request.method=='GET':
     data=HouseImage.objects.all() 
     serializer = ImageSerilizer(data, many=True)
     respose = {'message': 'house image found',
                'data': serializer.data }
     return Response(data=respose, status=status.HTTP_200_OK)
  
  elif request.method == 'POST':
    serialiazer = ImageSerilizer(data=request.data)
    if serialiazer.is_valid():
      serialiazer.save()
    
      return Response({'house image':serialiazer.data}, status=status.HTTP_200_OK)
    return Response(serialiazer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, IsRealtor, ~IsAdmin])
def house (request, pk):
   try:
      data = House.objects.get(id=pk)
   except House.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)
   if request.method=='GET':
      serialiazer = HouseSerializer(data)
      return Response({'house': serialiazer.data}, status=status.HTTP_200_OK)
   
   elif request.method == 'DELETE':
      data.delete()
      return Response(status=status.HTTP_200_OK)
   
   elif request.method == 'PUT':
      serialiazer = HouseSerializer(data, data=request.data)
      if serialiazer.is_valid():
         serialiazer.save()
         return Response({'house': serialiazer.data}, status=status.HTTP_200_OK)
      return Response(serialiazer.errors, status=status.HTTP_400_BAD_REQUEST)
        


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated, IsTenant])
def payRent(request):

  if request.method=='GET':
     data=RentPayment.objects.all() 
     serializer = RentSerializer(data, many=True)
     respose = {'message': 'Rent Bill Setlement',
                'data': serializer.data }
     return Response(data=respose, status=status.HTTP_200_OK)
  
  elif request.method == 'POST':
    serialiazer = RentSerializer(data=request.data)
    if serialiazer.is_valid():
      serialiazer.save()
    
      return Response({'Rent Bill Setlement':serialiazer.data}, status=status.HTTP_200_OK)
    return Response(serialiazer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, IsTenant, ~IsAdmin])
def rent (request, pk):
   try:
      data = RentPayment.objects.get(id=pk)
   except RentPayment.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)
   if request.method=='GET':
      serialiazer = RentSerializer(data)
      return Response({'Rent bill': serialiazer.data}, status=status.HTTP_200_OK)
   
   elif request.method == 'DELETE':
      data.delete()
      return Response(status=status.HTTP_200_OK)
   
   elif request.method == 'PUT':
      serialiazer = RentSerializer(data, data=request.data)
      if serialiazer.is_valid():
         serialiazer.save()
         return Response({'Rent bill': serialiazer.data}, status=status.HTTP_200_OK)
      return Response(serialiazer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])   
def bill (request, pk):
   try:
      data = RentPayment.objects.get(id=pk)
   except RentPayment.DoesNotExist:
      return Response(status=status.HTTP_400_BAD_REQUEST)
   if request.method=='GET':
      serialiazer = RentSerializer(data)
      return Response({'Bill': serialiazer.data}, status=status.HTTP_200_OK)
   return Response(serialiazer.errors, status=status.HTTP_400_BAD_REQUEST)
   

class MyBill(generics.ListAPIView):
    permission_classes = [IsTenant] # Custom permission class used~~
    #  ~IsAdmin, ~IsTenant, ~IsHouseOwner
    queryset = RentPayment.objects.all()
    serializer_class = RentSerializer
    def get_queryset(self):
        user = self.request.user
        print(user)
        return RentPayment.objects.filter(tenant=user)



 
class checkBills(generics.ListAPIView, ):
    permission_classes = [IsRealtor] # Custom permission class used~~
    #  ~IsAdmin, ~IsTenant, ~IsHouseOwner
    queryset = RentPayment.objects.all()
    serializer_class = RentSerializer
    def get_queryset(self):
        user = self.request.user
        print(user.email)
        return RentPayment.objects.filter(realtor=user)
   
   #  'realtor@dev.com'
 

 
class checkHouse(generics.ListAPIView):
    permission_classes = [IsRealtor] # Custom permission class used~~
    queryset = House.objects.all()
    serializer_class = HouseSerializer
    def get_queryset(self):
        user = self.request.user
        print(user)
        return House.objects.filter(tenant=user)
   # 'cf@gmail.com'
   #  'realtor@dev.com'
 

 

