from django.urls import path
from . import controllers

urlpatterns = [
    path('', controllers.BlogController.as_view()),
    path('<str:pk>', controllers.BlogController.as_view()),

]
