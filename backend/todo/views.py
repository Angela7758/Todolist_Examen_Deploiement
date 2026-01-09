from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Category, Task
from .serializers import CategorySerializer, TaskSerializer

#   LISTE + CRÉATION DES CATÉGORIES
@api_view(["GET", "POST"])
def categories_view(request):

    # --- GET : renvoyer toutes les catégories ---
    if request.method == "GET":
        categories = Category.objects.all().order_by("id")
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # --- POST : créer une nouvelle catégorie ---
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        category = serializer.save()
        return Response(
            CategorySerializer(category).data,
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#   SUPPRESSION D’UNE CATÉGORIE
@api_view(["DELETE"])
def category_detail_view(request, pk):

    # Vérifier si la catégorie existe
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response({"detail": "Catégorie introuvable."}, status=status.HTTP_404_NOT_FOUND)

    # Supprimer d’abord toutes les tâches associées
    Task.objects.filter(category=category).delete()

    # Puis supprimer la catégorie
    category.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)


#   LISTE + CRÉATION DES TÂCHES
@api_view(["GET", "POST"])
def tasks_view(request):

    # --- GET : récupérer toutes les tâches, avec filtre optionnel ---
    if request.method == "GET":
        qs = Task.objects.all().order_by("-created_at")

        # Filtrer selon ?category_id=xx
        category_id = request.query_params.get("category_id")
        if category_id:
            qs = qs.filter(category_id=category_id)

        serializer = TaskSerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # --- POST : ajouter une tâche ---
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        task = serializer.save()
        return Response(
            TaskSerializer(task).data,
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#   MODIFICATION OU SUPPRESSION D’UNE TÂCHE
@api_view(["PATCH", "DELETE"])
def task_detail_view(request, pk):

    # Vérifier si la tâche existe
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response({"detail": "Tâche introuvable."}, status=status.HTTP_404_NOT_FOUND)

    # --- PATCH : mise à jour partielle ---
    if request.method == "PATCH":
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            updated = serializer.save()
            return Response(TaskSerializer(updated).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # --- DELETE : suppression ---
    task.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
