from django.contrib import admin
from .models import House, HouseImage, RentPayment
# , TenantHouse
# TenantHouse
# Register your models here.

admin.site.register(House)
admin.site.register(RentPayment)
admin.site.register(HouseImage)