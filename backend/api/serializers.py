from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import UserProfile
from finances.models import Category, Transaction, Budget, SavingsGoal
from notifications.models import Reminder, Notification

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'preferred_currency', 'monthly_income', 'phone_number', 
                  'profile_picture', 'notification_enabled']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'color', 'is_expense']

class TransactionSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'category', 'category_name', 'transaction_type', 
                  'date', 'description', 'receipt', 'is_recurring']
        
class BudgetSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    spent_amount = serializers.ReadOnlyField()
    remaining_amount = serializers.ReadOnlyField()
    percentage_used = serializers.ReadOnlyField()
    
    class Meta:
        model = Budget
        fields = ['id', 'category', 'category_name', 'amount', 'month', 'year', 
                  'spent_amount', 'remaining_amount', 'percentage_used']

class SavingsGoalSerializer(serializers.ModelSerializer):
    progress_percentage = serializers.ReadOnlyField()
    
    class Meta:
        model = SavingsGoal
        fields = ['id', 'name', 'target_amount', 'current_amount', 'target_date', 
                  'icon', 'is_completed', 'progress_percentage']

class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = ['id', 'title', 'amount', 'reminder_type', 'frequency', 
                  'due_date', 'description', 'is_active']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'title', 'message', 'notification_type', 'is_read', 'created_at']