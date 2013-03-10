from django.db import models

# Create your models here.
class PrintableCV(models.Model):
    url_hash = models.CharField(max_length=32, db_index=True)
    cv_parameters = models.TextField()