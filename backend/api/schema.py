import graphene
from graphene_django.types import DjangoObjectType
from .models import Item
from django.contrib.auth.models import User
import graphql_jwt

# Définir les types GraphQL pour Item et User
class ItemType(DjangoObjectType):
    class Meta:
        model = Item
        fields = '__all__'

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Définir les requêtes (Queries)
class Query(graphene.ObjectType):
    all_items = graphene.List(ItemType)
    all_users = graphene.List(UserType)
    me = graphene.Field(UserType)

    def resolve_all_items(root, info):
        user = info.context.user
        if user.is_authenticated:
            return Item.objects.all()
        return Item.objects.none()

    def resolve_all_users(root, info):
        user = info.context.user
        if user.is_authenticated:
            return User.objects.all()
        return User.objects.none()

    def resolve_me(root, info):
        user = info.context.user
        if user.is_authenticated:
            return user
        return None

# Définir les mutations (ex : création d'Item)
class CreateItem(graphene.Mutation):
    item = graphene.Field(ItemType)

    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String(required=True)

    def mutate(self, info, title, description):
        user = info.context.user
        if user.is_authenticated:
            item = Item.objects.create(title=title, description=description, owner=user)
            return CreateItem(item=item)
        raise Exception("Authentication required to create item")

class Mutation(graphene.ObjectType):
    # Authentification JWT
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    # Ajout de la mutation pour créer un Item
    create_item = CreateItem.Field()

# Schéma GraphQL complet
schema = graphene.Schema(query=Query, mutation=Mutation)
