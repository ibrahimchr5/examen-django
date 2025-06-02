from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt

# Define your API endpoints
urlpatterns = [
    path('items/', views.ItemList.as_view(), name='item-list'),
    path('items/<int:pk>/', views.ItemDetail.as_view(), name='item-detail'),
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('register/', views.UserRegistration.as_view(), name='user-registration'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', views.CurrentUserView.as_view(), name='current-user'),
    path('logout/', views.LogoutView.as_view(), name='logout'),

]

# Add suffix pattern support for the API routes that need it
urlpatterns = format_suffix_patterns(urlpatterns)

# Add GraphQL route separately after applying format_suffix_patterns
urlpatterns += [
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),  # GraphQL endpoint
]
