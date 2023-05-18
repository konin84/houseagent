from django.urls import path
from . import views

urlpatterns = [
    # path('realtor-houses', views.RealtorRegisteredHouses.as_view()),
    path('all-houses', views.Houses),
    path('realtor-houses', views.RealtorRegisteredHouses.as_view()),
    path('rentBill', views.payRent),
    path('rent/<str:pk>', views.rent),
    path('bill/<str:pk>', views.bill),
    path('myBill', views.MyBill.as_view()),
    path('bills', views.checkBills.as_view()),
    path('total-bills', views.TotalBills),
    path('realtor-total-bills', views.TotalRealtorBills),

    path('houses', views.listHouse),
   
    path('house/<str:pk>', views.house),
    path('house/delete/<str:pk>', views.house),
    path('house/update/<str:pk>', views.house),
    path('images', views.images),

    path('house', views.checkHouse.as_view()),

]