from django.urls import path
from . import views

urlpatterns = [
    
  path('administratorSignup', views.SignUpAdministrator.as_view()),
  path('realtor/<str:pk>', views.realtor),
  
  path('realtorSignup', views.SignUpRealtor.as_view()),
  path('agentUsers', views.AgentCreatedUsers.as_view()),
  path('myTenants', views.MyTenant.as_view()),
  path('myRents', views.MyHouse.as_view()),
  path('myLandLords', views.MyLandlords.as_view()),

  path('tenantSignup', views.SignUpTenant.as_view()),
  path('tenant', views.listTenant),
  path('tenant/<str:pk>', views.realtorTenant),

  path('houseOwnerSignUp', views.SignUpHouseOwner.as_view()),
  path('houseOwner', views.listHouseOwner),
  path('houseOwner/<str:pk>', views.myLandLord),

  path('myAgent', views.LandLordagent.as_view()),
  path('myhouses', views.LandlordHouses.as_view()),
  path('tenantAgent', views.tenantAgent.as_view()),
  
  # Strickly for admin
  # view-users
  path('view-users', views.allUsers),
  path('tenants', views.allTenant),
  path('landLords', views.allHouseOwners),
  path('view-realtors', views.allRealtors),
  path('view-administrators', views.allAdministators),
  path('test', views.anonymousUsers),

]