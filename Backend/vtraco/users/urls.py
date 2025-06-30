from django.urls import path, include
from .views import (
    SignupView, LoginView, AddEmployerAPIView,
    add_employee, ForgotPasswordRequestView,
    verify_otp, LogoutView
    
)
from .views import get_employee_profile


urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView, name='login'),
    path('logout/', LogoutView, name='logout'),
    path('add-employer/', AddEmployerAPIView.as_view(), name='add-employer'),
    path('add-employee/', add_employee, name='add_employee'),
    path('forgot-password/', ForgotPasswordRequestView.as_view(), name='forgot-password'),
    path('verify_otp/', verify_otp, name='verify_otp'),
    path('api/employer/', include('employer.urls')),
    path('api/employee/profile/', get_employee_profile),  # ✅ fixed line

]
