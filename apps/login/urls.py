from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'process/(?P<option>.*)', views.process, name="process")
]