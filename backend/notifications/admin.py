from django.contrib import admin
from .models import Reminder, Notification

@admin.register(Reminder)
class ReminderAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'reminder_type', 'frequency', 'due_date', 'is_active')
    list_filter = ('reminder_type', 'frequency', 'is_active')
    search_fields = ('user__username', 'title')
    date_hierarchy = 'due_date'

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'notification_type', 'is_read', 'created_at')
    list_filter = ('notification_type', 'is_read')
    search_fields = ('user__username', 'title', 'message')
    date_hierarchy = 'created_at'