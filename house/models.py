from django.db import models
from account.models import UserAccount
from django.core.validators import RegexValidator
# from django_countries. import CountryField
# from django_countries.fields import CountryField
from django.conf import settings

from account.models import HouseOwner, Realtor, Tenant

phone_validator = RegexValidator(r"^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$", "The phone number provided is invalid")


def upload_path(instance, filename):
  return '/'.join(['images/house_image', str(instance.title), filename])  


class House(models.Model):
  class HouseType(models.TextChoices):
   
    Apartment = 'Apartment'
    Bungalow = 'Bungalow'
    Duplex = 'Duplex'
    Mansion = 'Mansion'
    Other = 'Other'
    Studio = 'Studio'
    Townhouse = 'Townhouse'
    Villa = 'Villa'


  realtor =  models.CharField(max_length=100, null=True, blank=True)
  # houseOwner = models.CharField(max_length=100, null=True, blank=True)
  houseOwner = models.ForeignKey(HouseOwner, on_delete=models.SET_NULL, null=True, blank=True, related_name ='house_houseOwner')
  # tenantemail = models.CharField(max_length=100, null=True, blank=True)
  tenant = models.ForeignKey(Tenant, on_delete=models.SET_NULL, null=True, blank=True, related_name='tenant_house')

  country = models.CharField(max_length=100, null=True, blank=True)
  # houseOwner = models.ForeignKey(HouseOwner, on_delete=models.SET_NULL, null=True, blank=True)
  reference = models.CharField(max_length=100)
  state = models.CharField(max_length=100, null=True, blank=True)
  city = models.CharField(max_length=100)
  address = models.CharField(max_length=255)
  bedrooms = models.IntegerField()
  bathrooms = models.IntegerField()
  price = models.IntegerField()
  houseType = models.CharField(max_length=25, choices=HouseType.choices, default=HouseType.Villa)
  # photo = models.ImageField(upload_to=upload_path, blank=True, null=True, default='images/house_image/default.png')
  createdDate = models.DateTimeField(auto_now_add=True)
  updateDate = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f'{self.reference} - {self.realtor}'
  

class HouseImage(models.Model):
  title = models.CharField(max_length=32, blank=False)
  photo = models.ImageField(upload_to=upload_path, blank=True, null=True)

  def __str__(self):
    return (self.title)
  

class RentPayment(models.Model):
  # realtor = models.CharField(max_length=100)
  class PaymentMethod(models.TextChoices):
    Other = 'Other'
    Cash = 'Cash'
    Cheque = 'Cheque'
    Momo = 'Momo'

  tenant = models.EmailField(max_length=100, null=True, blank=True)
  realtor = models.EmailField(max_length=100, null=True, blank=True)
  # house = models.CharField(max_length=100)
  amount = models.FloatField(blank=True, null=True)
  paymentMethod = models.CharField(max_length=25, choices=PaymentMethod.choices, default=PaymentMethod.Momo)

  createdDate = models.DateTimeField(auto_now_add=True, blank=True, null=True)
  updateDate = models.DateTimeField(auto_now=True)
  def __str__(self):
    return f' Made by {self.tenant}'
  

