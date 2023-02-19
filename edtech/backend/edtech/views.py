import datetime
import calendar
import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from edtech.Serializer import ClassSerializer
from edtech.models import ClassesData, Attendence, Assignments, AssignmentSubmission, AssignmentSubmissionImage, \
    Student, Batch, Room


@api_view(["POST"])
def login(request):
    if request.method == "POST":
        email = request.data.get('email')
        password = request.data.get('password')
        data = Student.objects.filter(email=email, password=password)
        if data:
            return JsonResponse({'status': "success", 'student_id': data[0].id})
        return JsonResponse({'status': 'failed'})


def subscription(request):
    if request.method == "POST":
        student_id = request.POST.get('student_id')
        studentObject = Student.objects.filter(id=student_id)
        print(studentObject[0].Batches.all())
        data = studentObject[0].Batches.all()
        # print(stObject.Subscription_set.all())
        l = []
        for ele in data:
            l.append({'batch_name': ele.batch_name, 'desc': ele.desc,
                      'batch_id': ele.id}, )
        d = {'info': l}
        return JsonResponse(d)


def Overview(request):
    if request.method == "POST":
        batch_id = request.POST.get('batch_id')
        batchObject = Batch.objects.filter(id=batch_id)
        if batchObject:
            return JsonResponse({"batch_name": batchObject[0].batch_name, "start_date": batchObject[0].start_date,
                                 'end_date': batchObject[0].end_date, "desc": batchObject[0].desc})
        return JsonResponse({'batch_name': ""})


@api_view(['GET', 'POST'])
def class_list(request):
    if request.method == "POST":
        batch_id = request.POST.get('batch_id')
        classObject = ClassesData(batch_id=batch_id)
        classObject.save()
        print('hi')
        return Response(classObject.id)
    elif request.method == "GET":
        print('hi')
        batch_id = request.GET.get('batch_id')
        snippets = ClassesData.objects.filter(batch_id=batch_id).values_list('class_date', flat=True).distinct()
        # print(snippets)
        # serializer = ClassSerializer(snippets, many=True)
        return Response(snippets)


def totalclass(request):
    if request.method == "POST":
        print('hi')
        batch_id = request.POST.get('batch_id')
        month = request.POST.get('month')
        year = request.POST.get("year")
        enddate = calendar.monthrange(int(year), int(month))[1]
        snippets = ClassesData.objects.filter(
            batch_id=batch_id, class_date__range=[f"{year}-{month}-01", f"{year}-{month}-{enddate}"]) \
            .values_list('class_date', flat=True).distinct()
        print(snippets)
        # print(snippets)
        # serializer = ClassSerializer(snippets, many=True)
        return snippets


@api_view(['PUT'])
def endClass(request):
    if request.method == "PUT":
        id = request.POST.get('id')
        classObject = ClassesData.objects.get(id=id, end_time__isnull=True)
        classObject.end_time = datetime.datetime.now().time()
        classObject.save()
        return Response("success")


@api_view(['POST'])
def takeAttendence(request):
    if request.method == 'POST':
        date = request.POST.get('date')
        student_id = request.POST.get('student_id')
        batch_id = request.POST.get('batch_id')

        try:
            check = Attendence.objects.get(student_id=student_id, batch_id=batch_id,
                                           attendance_date=date)
            check.save()
            return Response("already exists")
        except Attendence.DoesNotExist:
            data = Attendence(student_id=student_id, batch_id=batch_id, attendance_date=date)
            data.save()
            return Response("Attendence Marked")


@api_view(['POST'])
def viewAttendenceview(request):
    if request.method == "POST":
        student_id = request.POST.get('student_id')
        batch_id = request.POST.get('batch_id')
        month = request.POST.get('month')
        year = request.POST.get("year")
        enddate = calendar.monthrange(int(year), int(month))[1]
        data = Attendence.objects.filter(student_id=student_id,
                                         batch_id=batch_id,
                                         attendance_date__range=[f"{year}-{month}-01", f"{year}-{month}-{enddate}"]) \
            .values_list('attendance_date', flat=True).distinct()

        classes = len(totalclass(request))
        dayspresent = len(data)
        return JsonResponse({'present': dayspresent, 'classes': classes})


@api_view(["POST"])
def AssignmentsApi(request):
    if request.method == "POST":
        batch_id = request.POST.get("batch_id")
        student_id = request.POST.get('student_id')
        # data = Assignments.objects.filter(batch_id=batch_id).order_by("-id")
        data = Assignments.objects.filter(batch_id=batch_id)
        l = []
        if data:
            for ele in data:
                print(ele.date_time)
                date_time = ele.date_time.strftime("%Y-%m-%d, %I:%m %p")
                print(date_time)
                if AssignmentSubmission.objects.filter(student_id=student_id,Assignments_id=ele.id):
                    d = {"name": ele.desc, "date_time": date_time, 'id': ele.id,'status':'Submitted'}
                else:
                    d = {"name": ele.desc, "date_time": date_time, 'id': ele.id, 'status': 'Pending'}
                # d = {"name": ele.desc, "deadline": ele.deadline, "image": image, 'id': ele.id}
                l.append(d)
        data = {"Assignments": l}
        return JsonResponse(data)
        # else:
        #     d = {}
        #     return JsonResponse(d)


@api_view(['POST'])
def AssignmentsSubmit_list(request, id):
    if request.method == "POST":
        # batch_id = request.POST.get('batch_id')
        assignment_id = id
        student_id = request.POST.get('student_id')
        assignmentObject = Assignments.objects.filter(id=id)
        if assignmentObject:
            status = "Pending"
            submitList = []
            image = json.dumps(str(assignmentObject[0].image))
            image = image.replace('"', "")
            deadline = assignmentObject[0].deadline.strftime("%Y-%m-%d, %I:%M %p")
            submitObject = AssignmentSubmission.objects.filter(Assignments_id = assignment_id,student_id=student_id)
            if submitObject:
                submittedList = AssignmentSubmissionImage.objects.filter(AssignmentSubmission_id=submitObject[0].id)
                if submittedList:
                    status = "Submitted"
                    for ele in submittedList:
                        submitImage = json.dumps(str(ele.image))
                        submitImage = submitImage.replace('"', "")
                        submitList.append(submitImage)

                # deadline = datetime.datetime.strptime(str(assignmentObject[0].deadline),
                #                  "%d%b%Y%H%M%S")
                # l=[]
                # for rows in submittedList:
                #     l.append({'assignment_id':rows.Assignments_id})
            d = {'status': status, 'name': assignmentObject[0].desc,
                 'deadline': deadline, 'image': image,'submitImage':submitList}

            return JsonResponse(d)
        else:
            return HttpResponse("No Such Assignment")


@api_view(['POST'])
def submitAssignmentsApi(request, id):
    if request.method == "POST":
        print('hi')
        # assignment_id = request.POST.get('assignment_id')
        assignment_id = id
        batch_id = request.POST.get('batch_id')
        student_id = request.POST.get('student_id')
        image = request.FILES.get('image')
        check = AssignmentSubmission.objects.filter(Assignments_id=assignment_id, batch_id=batch_id,
                                                    student_id=student_id)
        if not check:
            assignmentSubmissionObject = AssignmentSubmission(Assignments_id=assignment_id, batch_id=batch_id,
                                                              student_id=student_id)
            assignmentSubmissionObject.save()

        data = AssignmentSubmission.objects.get(Assignments_id=assignment_id, batch_id=batch_id,
                                                student_id=student_id)

        imageobject = AssignmentSubmissionImage(AssignmentSubmission_id=data.id, image=image)
        imageobject.save()

        return Response('Submitted')


def liveData(request):
    print('hi')
    if request.method == "POST":
        student_id = request.POST.get("student_id")
        studentObject = Student.objects.get(id=student_id)

        return JsonResponse({'name':studentObject.name,'role':studentObject.group})


def roominfo(request):
    if request.method=="POST":
        batch_id = request.POST.get("batch_id")
        roomObject = Room.objects.get(batch_id=batch_id)
        return JsonResponse({'room_id':roomObject.room_id})


