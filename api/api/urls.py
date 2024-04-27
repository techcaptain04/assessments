from django.contrib import admin
from django.urls import path, include
import blog.urls as blog_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('', include('rest_framework.urls')),
        path('blogs/', include(blog_urls)),
    ])),
]
