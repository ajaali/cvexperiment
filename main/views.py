import uuid
import simplejson

from django.http import HttpResponse
from django.shortcuts import render_to_response, RequestContext

from main.models import Printable, ErrorReport

def main_page(request):
    """
    Render the main page
    """
    template_name = "index.html"
    return render_to_response(template_name, context_instance=RequestContext(request))

def save_print(request):
    """
    Create a printable object in the database
    """
    if request.method == "POST":
        printable = Printable(uuid = uuid.uuid1().hex)
        printable.email_to = request.POST['email_to']
        printable.profile_json = request.POST['profile_json']
        printable.save()
        return HttpResponse(simplejson.dumps({"status":"OK"}))
    return HttpResponse(simplejson.dumps({"status":"ERROR"}))

def save_error(request):
    """
    Create a errpr report object in the database
    """
    if request.method == "POST":
        error_rep = ErrorReport(uuid = uuid.uuid1().hex)
        error_rep.email_to = request.POST['email_to']
        error_rep.profile_json = request.POST['profile_json']
        error_rep.description = request.POST['description']
        error_rep.save()
        return HttpResponse(simplejson.dumps({"status":"OK"}))
    return HttpResponse(simplejson.dumps({"status":"ERROR"}))
