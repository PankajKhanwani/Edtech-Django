from django.conf import settings
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from edtech.restviews import student_list, batch_list, AnnouncementsApi, studyMaterialApi
from edtech.views import class_list, endClass, takeAttendence, viewAttendenceview, AssignmentsApi, submitAssignmentsApi, \
    AssignmentsSubmit_list, login, subscription, Overview, liveData, roominfo

urlpatterns = [

                  path('admin', admin.site.urls),
                  path('login', login),
                  path('subscription', subscription),
                  path('Overview', Overview),
                  path('student', student_list),
                  path('batch', batch_list),
                  path('class', class_list),
                  path('endclass', endClass),
                  path('takeAttendence', takeAttendence),
                  path('viewAttendence', viewAttendenceview),
                  path('assignments', AssignmentsApi),
                  path('assignments/<int:id>/submit', submitAssignmentsApi),
                  path('assignments/<int:id>', AssignmentsSubmit_list),
                  path('AnnouncementsApi', AnnouncementsApi),
                  path('studyMaterialApi', studyMaterialApi),
                  path('liveData', liveData),
                  path('roominfo', roominfo)

              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
