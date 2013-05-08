from django.db import models

class Printable(models.Model):
    uuid = models.CharField(max_length=32)
    email_to = models.EmailField()
    profile_json = models.TextField()
    
class ErrorReport(models.Model):
    uuid = models.CharField(max_length=32)
    created = models.DateTimeField(auto_now=True)
    email_to = models.EmailField()
    profile_json = models.TextField()
    descirption = models.TextField()
