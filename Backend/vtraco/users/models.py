from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth import get_user_model





class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, role_id=None, employee_name=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(
            username=username,
            email=email,
            role_id=role_id,
            employee_name=employee_name or username,  # ✅ this sets employee_name properly
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role_id", 1)  # admin

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(
            username=username,
            email=email,
            password=password,
            employee_name=username,  # also set employee_name for superuser
            **extra_fields
        )

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    role_id = models.IntegerField(choices=[(1, 'Admin'), (2, 'Employer'), (3, 'Employee')])
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    company_name = models.CharField(max_length=255, null=True, blank=True)
    contact = models.CharField(max_length=15, null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_delete = models.BooleanField(default=False)
    joining_date = models.DateField(null=True, blank=True)
    is_current_employee = models.BooleanField(default=True)
    profile_completed = models.BooleanField(default=False)   
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    designation = models.CharField(max_length=100, null=True, blank=True)
    employee_name = models.CharField(max_length=255, null=True, blank=True)
    dob = models.DateField(null=True, blank=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    country_code = models.CharField(max_length=5, null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], null=True, blank=True)
   
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class OTPVerification(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    


    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(minutes=10)

    def __str__(self):
        return f"{self.user.email} - OTP: {self.otp}" 
    from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class EmployeeRequest(models.Model):
    REQUEST_TYPE_CHOICES = [
        ('leave', 'Leave'),
        ('wfh', 'Work From Home'),
        ('other', 'Other'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('resolved', 'Resolved'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_employee_requests')
    request_type = models.CharField(max_length=20, choices=REQUEST_TYPE_CHOICES)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.request_type}"

    
    

# class Attendance(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='attendance_from_users')
#     date = models.DateField()
#     day = models.CharField(max_length=20)
#     login_time = models.TimeField()
#     logout_time = models.TimeField(null=True, blank=True)
#     eod_report = models.TextField(blank=True)
#     document = models.FileField(upload_to='attendance_docs/', null=True, blank=True)

#     def __str__(self):
#         return f"{self.user.username} - {self.date}"
