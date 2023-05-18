from django.db import models
from account.models import UserAccount, Realtor, HouseOwner


def upload_path(instance, filename):
  return '/'.join(['images/user_profile', str(instance.accountOwner), filename])  

def upload_path_id(instance, filename):
  return '/'.join(['images/landlord_id', str(instance.accountOwner), filename])  

class Profile(models.Model):
       
    accountOwner = models.OneToOneField(UserAccount, on_delete=models.CASCADE, unique=True, null=True, blank=True)
    bio = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    photo = models.ImageField(upload_to=upload_path, blank=True, null=True)
    createdDate = models.DateTimeField(auto_now_add=True)
    updateDate = models.DateTimeField(auto_now=True)
    
    def __str__(self):
      return f' profile of {self.accountOwner}'


class LandLordExtra(models.Model):
     realtor = models.OneToOneField(Realtor, on_delete=models.CASCADE,  null=True, blank=True, related_name='realtor')
     landlord = models.ForeignKey(HouseOwner, on_delete=models.CASCADE, null=True, blank=True, related_name='landlord')
     photo = models.ImageField(upload_to=upload_path_id, blank=True, null=True)
     createdDate = models.DateTimeField(auto_now_add=True)
     updateDate = models.DateTimeField(auto_now=True)

     def __str__(self):
      return f'Extra info of {self.landlord}'


