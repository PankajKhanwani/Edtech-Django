import json

from django.db import models


# Create your models here.
class Student(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    phonenumber = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=500)
    dob = models.DateField()
    password = models.CharField(max_length=20)
    group = models.CharField(max_length=20, default="student")

    def __str__(self):
        return self.name


# class SignUpStudent(models.Model):
#     Student = models.OneToOneField(Student,on_delete=models.DO_NOTHING)


class Batch(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ManyToManyField(Student, related_name="Batches")
    batch_name = models.CharField(max_length=100, unique=True)
    desc = models.CharField(max_length=300)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    # def __str__(self):
    #     return self.batch_name


class ClassesData(models.Model):
    id = models.AutoField(primary_key=True)
    batch = models.ForeignKey(Batch, on_delete=models.DO_NOTHING)
    class_date = models.DateField(auto_now_add=True)
    start_time = models.TimeField(auto_now_add=True)
    end_time = models.TimeField(null=True, blank=True)

    # def __str__(self):
    #     return self.batch.batch_name +"_____" + str(self.class_date)


class Attendence(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.DO_NOTHING)
    batch = models.ForeignKey(Batch, on_delete=models.DO_NOTHING)
    attendance_date = models.DateField()
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)


class Assignments(models.Model):
    id = models.AutoField(primary_key=True)
    batch = models.ForeignKey(Batch, on_delete=models.DO_NOTHING)
    desc = models.CharField(max_length=300)
    date_time = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()
    image = models.ImageField(upload_to='assignments/images', default="")

    class Meta:
        verbose_name_plural = "Assignments"

    def __str__(self):
        return self.desc


class Image(models.Model):
    image = models.ImageField(upload_to='assignments/images', default="")

    def __str__(self):
        self.name = json.dumps(str(self.image))
        index = self.name.rfind('/')
        if index != -1:
            self.name = self.name[index + 1:len(self.name) - 1]
        return self.name


class AssignmentSubmission(models.Model):
    Assignments = models.ForeignKey(Assignments, on_delete=models.DO_NOTHING)
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    submitted_on = models.DateTimeField(auto_now=True)


class AssignmentSubmissionImage(models.Model):
    AssignmentSubmission = models.ForeignKey(AssignmentSubmission, on_delete=models.DO_NOTHING)
    image = models.ImageField(upload_to='assignments/images', null=False, blank=False)

    def __str__(self):
        self.name = json.dumps(str(self.image))
        index = self.name.rfind('/')
        if index != -1:
            self.name = self.name[index + 1:len(self.name) - 1]
        return self.name


class Announcements(models.Model):
    id = models.AutoField(primary_key=True)
    batch = models.ForeignKey(Batch, on_delete=models.DO_NOTHING)
    desc = models.CharField(max_length=1000)
    date_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.desc


class StudyMaterial(models.Model):
    id = models.AutoField(primary_key=True)
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE)
    name = models.CharField(max_length=500)
    fileData = models.FileField(upload_to='StudyMaterial/Files', default="")

    def __str__(self):
        return self.name


class Room(models.Model):
    room_id = models.CharField(primary_key=True, max_length=100)
    name = models.CharField(max_length=100)
    batch = models.OneToOneField(Batch, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.room_id + " " + str(self.batch_id)
