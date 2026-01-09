from django.urls import path
from .views import (
    categories_view,
    category_detail_view,
    tasks_view,
    task_detail_view,
)

urlpatterns = [

    # Catégories
    path("categories/", categories_view),             
    path("categories/<int:pk>/", category_detail_view),  

    # Tâches
    path("tasks/", tasks_view),                        
    path("tasks/<int:pk>/", task_detail_view),         
]
