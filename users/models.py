from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager as _UserManager, make_password

from lib.models import enum, states, optional, AddressPhoneAbstract

class UserManager( _UserManager):
    def _create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        user = self.model( email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user( email, password, **extra_fields)


class User( AddressPhoneAbstract, AbstractUser):
    username = first_name = last_name = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    email = models.EmailField( unique=True)
    name = models.CharField( max_length=150, blank=True)
    avatar = models.ImageField( null=True, blank=True)

    def __str__(self):
        return self.email

    def get_full_name( self):
        return self.name or self.email

# vim:ts=4:sw=4:expandtab
