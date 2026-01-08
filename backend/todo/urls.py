from django.urls import path
from .views import categories_view, tasks_view, task_detail_view

urlpatterns = [
    path("categories/", categories_view),
    path("tasks/", tasks_view),
    path("tasks/<int:pk>/", task_detail_view),
]
