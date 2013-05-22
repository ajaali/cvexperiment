from django.conf.urls.defaults import *
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'main.views.main_page'),
    url(r'^save_print/', 'main.views.save_print'),
    url(r'^save_error/', 'main.views.save_error'),
    
    url(r'^print/(?P<uuid>\w+)/$', 'main.views.show_print'),
    #url(r'^error/', 'main.views.save_error'),
    

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

)

urlpatterns += staticfiles_urlpatterns()
