from django.urls import path
from . import views
from .views import get_employer
from django.urls import path, include

urlpatterns = [
    # Employee CRUD
    path('employees/', views.list_employees, name='list_employees'),
    path('update-employee/<int:employee_id>/', views.update_employee, name='update_employee'),
    path('delete-employee/<int:employee_id>/', views.delete_employee, name='delete_employee'),

    # Salary
    path('salary/<int:id>/', views.update_salary, name='update_salary'),
    path('bulk-update-salary/', views.bulk_update_salary, name='bulk_update_salary'),

    # Analytics
    path('get-all-employees/', views.get_all_employees, name='get_all_employees'),
      path('details/', views.get_employer, name='get_employer'),
      path('api/', include('employee.urls')),
      
]
