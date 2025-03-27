from django.contrib import admin
from .models import Category, Transaction, Budget, SavingsGoal

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_expense', 'color')
    list_filter = ('is_expense',)
    search_fields = ('name',)

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'category', 'transaction_type', 'date')
    list_filter = ('transaction_type', 'date', 'category')
    search_fields = ('user__username', 'description')
    date_hierarchy = 'date'

@admin.register(Budget)
class BudgetAdmin(admin.ModelAdmin):
    list_display = ('user', 'category', 'amount', 'month', 'year')
    list_filter = ('month', 'year', 'category')
    search_fields = ('user__username',)

@admin.register(SavingsGoal)
class SavingsGoalAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'target_amount', 'current_amount', 'target_date', 'is_completed')
    list_filter = ('is_completed',)
    search_fields = ('user__username', 'name')