from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Category, Task
from .serializers import CategorySerializer, TaskSerializer


@api_view(["GET", "POST"])
def categories_view(request):
    # GET: list
    if request.method == "GET":
        categories = Category.objects.all().order_by("id")
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # POST: create
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        category = serializer.save()
        return Response(CategorySerializer(category).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "POST"])
def tasks_view(request):
    # GET: list (可按 category_id 过滤)
    if request.method == "GET":
        qs = Task.objects.all().order_by("-created_at")

        category_id = request.query_params.get("category_id")
        if category_id:
            qs = qs.filter(category_id=category_id)

        serializer = TaskSerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # POST: create
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        task = serializer.save()
        return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH", "DELETE"])
def task_detail_view(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "PATCH":
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            task = serializer.save()
            return Response(TaskSerializer(task).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE
    task.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
