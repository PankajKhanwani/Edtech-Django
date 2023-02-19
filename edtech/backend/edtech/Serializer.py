from rest_framework import serializers

from edtech.models import Student, Batch, ClassesData, Announcements, StudyMaterial


class StudentSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Student
        fields = ('name', 'phonenumber', 'email', 'address', 'dob','password')


class BatchSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Batch
        fields = ('batch_name', 'desc', 'start_date', 'end_date')


class ClassSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ClassesData
        fields = ('batch_id', 'class_date', 'start_time', 'end_time')

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcements
        fields = ('batch', 'desc')


class StudyMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyMaterial
        fields = ['batch','name','fileData']
