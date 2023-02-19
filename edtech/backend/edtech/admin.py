from django.contrib import admin

from edtech.models import Student, ClassesData, Batch, Assignments, Attendence, AssignmentSubmission, Room

admin.site.register(Student)
admin.site.register(Batch)

admin.site.register(ClassesData)
admin.site.register(Assignments)
admin.site.register(Attendence)
admin.site.register(AssignmentSubmission)
admin.site.register(Room)
# Register your models here.
