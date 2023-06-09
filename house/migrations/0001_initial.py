# Generated by Django 4.1.7 on 2023-05-09 12:44

from django.db import migrations, models
import django.db.models.deletion
import house.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='HouseImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=32)),
                ('photo', models.ImageField(blank=True, null=True, upload_to=house.models.upload_path)),
            ],
        ),
        migrations.CreateModel(
            name='RentPayment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tenant', models.EmailField(blank=True, max_length=100, null=True)),
                ('realtor', models.EmailField(blank=True, max_length=100, null=True)),
                ('house', models.CharField(max_length=100)),
                ('amount', models.FloatField(blank=True, null=True)),
                ('paymentMethod', models.CharField(choices=[('Other', 'Other'), ('Cash', 'Cash'), ('Cheque', 'Cheque'), ('Momo', 'Momo')], default='Momo', max_length=25)),
                ('createdDate', models.DateTimeField(auto_now_add=True, null=True)),
                ('updateDate', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='House',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('realtor', models.CharField(blank=True, max_length=100, null=True)),
                ('country', models.CharField(blank=True, max_length=100, null=True)),
                ('reference', models.CharField(max_length=100)),
                ('state', models.CharField(blank=True, max_length=100, null=True)),
                ('city', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=255)),
                ('bedrooms', models.IntegerField()),
                ('bathrooms', models.IntegerField()),
                ('price', models.IntegerField()),
                ('houseType', models.CharField(choices=[('Apartment', 'Apartment'), ('Bungalow', 'Bungalow'), ('Duplex', 'Duplex'), ('Mansion', 'Mansion'), ('Other', 'Other'), ('Studio', 'Studio'), ('Townhouse', 'Townhouse'), ('Villa', 'Villa')], default='Villa', max_length=25)),
                ('createdDate', models.DateTimeField(auto_now_add=True)),
                ('updateDate', models.DateTimeField(auto_now=True)),
                ('houseOwner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='house_houseOwner', to='account.houseowner')),
                ('tenant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tenant_house', to='account.tenant')),
            ],
        ),
    ]
