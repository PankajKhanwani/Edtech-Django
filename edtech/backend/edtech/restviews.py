from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from edtech.Serializer import StudentSerializer, BatchSerializer, AnnouncementSerializer, StudyMaterialSerializer
from edtech.models import Student, Batch, ClassesData, Announcements, StudyMaterial


@api_view(['GET', 'POST'])
def student_list(request):
    print(request.data)
    if request.method == 'GET':
        snippets = Student.objects.all()
        serializer = StudentSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            student_id = serializer.save()
            return Response(student_id.id, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def batch_list(request):
    if request.method == 'GET':
        snippets = Batch.objects.all()
        serializer = BatchSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def AnnouncementsApi(request):
    if request.method == 'GET':
        batch_id=request.GET.get('batch_id')
        snippets = Announcements.objects.filter(batch_id=batch_id)
        serializer = AnnouncementSerializer(snippets, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AnnouncementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def studyMaterialApi(request):
    if request.method == "GET":
        batch_id = request.GET.get('batch_id')
        data = StudyMaterial.objects.filter(batch_id=batch_id)
        result = StudyMaterialSerializer(data,many=True)
        return Response(result.data)
    elif request.method == "POST":
        data = StudyMaterialSerializer(data=request.data)
        if data.is_valid():
            data.save()
            return Response(data.data)
        return Response(data.errors)
# @api_view(['GET', 'POST'])
# def classes_list(request):
#     print(request.data)
#     if request.method == 'GET':
#         snippets = ClassesData.objects.all()
#         serializer = ClassSerializer(snippets, many=True)
#         return Response(serializer.data)
#
#     elif request.method == 'POST':
#         serializer = ClassSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)