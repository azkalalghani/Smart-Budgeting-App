from django.db import models
from django.contrib.auth.models import User

class Reminder(models.Model):
    REMINDER_TYPES = [
        ('BILL', 'Bill Payment'),
        ('SUBSCRIPTION', 'Subscription Renewal'),
        ('CUSTOM', 'Custom Reminder'),
    ]
    
    FREQUENCY_CHOICES = [
        ('ONCE', 'One-time'),
        ('DAILY', 'Daily'),
        ('WEEKLY', 'Weekly'),
        ('MONTHLY', 'Monthly'),
        ('YEARLY', 'Yearly'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reminders')
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    reminder_type = models.CharField(max_length=15, choices=REMINDER_TYPES)
    frequency = models.CharField(max_length=10, choices=FREQUENCY_CHOICES)
    due_date = models.DateField()
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.title} - {self.due_date}"

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('BILL_DUE', 'Bill Due'),
        ('BUDGET_LIMIT', 'Budget Limit Reached'),
        ('SAVING_GOAL', 'Saving Goal Achieved'),
        ('SYSTEM', 'System Notification'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=100)
    message = models.TextField()
    notification_type = models.CharField(max_length=15, choices=NOTIFICATION_TYPES)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.title} - {'Read' if self.is_read else 'Unread'}"