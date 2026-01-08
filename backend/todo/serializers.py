from rest_framework import serializers
from .models import Category, Task


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]

    def validate_name(self, value):
        value = value.strip()
        if value == "":
            raise serializers.ValidationError("Le nom est obligatoire.")
        return value


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "description", "is_completed", "created_at", "category"]

    def validate_description(self, value):
        value = value.strip()
        if value == "":
            raise serializers.ValidationError("La description est obligatoire.")
        return value
