from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Tous les endpoints API REST (y compris GraphQL)
    path('api-auth/', include('rest_framework.urls')),
]
