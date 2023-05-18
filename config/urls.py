
from django.contrib import admin
from django.urls import path, include

from django.conf import settings # this is to import the settings configuration
from django.conf.urls.static import static # to import the static in the settings 
from django.views.generic import TemplateView # this import communicate with the index.html in the build in React

# from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path("api/admin/", admin.site.urls),
    path('api/', include('account.api.urls')),
    path('api/account/', include('account.urls')),
    path('api/house/', include('house.urls')),
    path('api/profile/', include('userprofile.urls')),

    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', TemplateView.as_view(template_name='index.html'))
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
