from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, blank=True)  # Icon name/class
    color = models.CharField(max_length=7, default="#ffffff")  # Hex color code
    is_expense = models.BooleanField(default=True)  # True for expense, False for income
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Categories"
    
    def __str__(self):
        return self.name

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('EXPENSE', 'Expense'),
        ('INCOME', 'Income'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='transactions')
    transaction_type = models.CharField(max_length=7, choices=TRANSACTION_TYPES)
    date = models.DateField(default=timezone.now)
    description = models.CharField(max_length=255)
    receipt = models.ImageField(upload_to='receipts/', blank=True, null=True)
    is_recurring = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.transaction_type} - {self.amount} - {self.date}"

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budgets')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='budgets')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.IntegerField()  # 1-12 for months
    year = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('user', 'category', 'month', 'year')
    
    def __str__(self):
        return f"{self.user.username} - {self.category.name} - {self.month}/{self.year} - {self.amount}"
    
    def spent_amount(self):
        """Calculate how much has been spent in this budget category for the month"""
        return Transaction.objects.filter(
            user=self.user,
            category=self.category,
            transaction_type='EXPENSE',
            date__month=self.month,
            date__year=self.year
        ).aggregate(models.Sum('amount'))['amount__sum'] or 0
    
    def remaining_amount(self):
        """Calculate remaining budget"""
        return self.amount - self.spent_amount()
    
    def percentage_used(self):
        """Calculate percentage of budget used"""
        if self.amount == 0:
            return 0
        return (self.spent_amount() / self.amount) * 100

class SavingsGoal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='savings_goals')
    name = models.CharField(max_length=100)
    target_amount = models.DecimalField(max_digits=10, decimal_places=2)
    current_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    target_date = models.DateField(null=True, blank=True)
    icon = models.CharField(max_length=50, blank=True)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.name} - {self.current_amount}/{self.target_amount}"
    
    def progress_percentage(self):
        """Calculate progress as a percentage"""
        if self.target_amount == 0:
            return 0
        return (self.current_amount / self.target_amount) * 100