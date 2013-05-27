from django.db import models
    
class ErrorReport(models.Model):
    uuid = models.CharField(max_length=32)
    created = models.DateTimeField(auto_now=True)
    email_to = models.EmailField()
    profile_json = models.TextField()
    description = models.TextField()
    user_system = models.TextField()
