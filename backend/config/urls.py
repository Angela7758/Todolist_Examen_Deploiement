from django.urls import path
from .views import (
    categories_view,
    category_detail_view,
    tasks_view,
    task_detail_view,
    health_view,
)

urlpatterns = [
    path("categories/", categories_view),

    # supprimer une catégorie
    path("categories/<int:pk>/", category_detail_view),

    path("tasks/", tasks_view),

    path("tasks/<int:pk>/", task_detail_view),

    path("health/", health_view),
]
