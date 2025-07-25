from rest_framework import serializers
from .models import CustomUser
from employee.models import Notification
from .models import Salary


class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = ['id', 'user', 'date', 'attendance_type', 'salary', 'status']


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'employee_name', 'email', 'designation', 'joining_date',
            'contact', 'salary', 'profile_picture', 'is_current_employee','profile_image' 
        ]
class EmployerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'email',
            'employee_name',
            'company_name',
            'contact',
            'designation',
            'dob',
            'salary',
            'joining_date',
            'profile_completed',
            'profile_picture',  # Include if you want profile image
        ]

