from rest_framework.permissions import BasePermission


class IsHouseOwner(BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if obj.author == request.user:
            return True
        return False
    
class IsTenant(BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if obj.author == request.user:
            return True
        return False
    
class IsRealtor(BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if obj.author == request.user:
            return True
        return False
    
class IsAdmin(BasePermission):
   def has_permission(self, request, view):
      return request.user.is_admin
   

class IsCreatorOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        # Always allow GET, HEAD or OPTIONS requests.
        # if request.method in SAFE_METHODS:
        #     return True
        # Instance must have an attribute named `creator`.
        return obj.creator == request.user