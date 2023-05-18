from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import  UserAccount, Administrator, Tenant, HouseOwner, Realtor
# Register your models here.

admin.site.register(UserAccount)
admin.site.register(Tenant)
admin.site.register(HouseOwner)
admin.site.register(Realtor)
admin.site.register(Administrator)
