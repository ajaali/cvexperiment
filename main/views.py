from django.shortcuts import render_to_response, RequestContext

def main_page(request):
    """
    Render the main page
    """
    template_name = "index.html"
    return render_to_response(template_name, context_instance=RequestContext(request))