# Generated by Django 4.1.7 on 2023-05-11 10:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('house', '0002_remove_rentpayment_house_remove_rentpayment_realtor'),
    ]

    operations = [
        migrations.AddField(
            model_name='rentpayment',
            name='realtor',
            field=models.EmailField(blank=True, max_length=100, null=True),
        ),
    ]
