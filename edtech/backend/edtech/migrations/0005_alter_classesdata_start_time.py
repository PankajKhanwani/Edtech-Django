# Generated by Django 4.1.1 on 2022-10-25 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edtech', '0004_alter_batch_batch_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classesdata',
            name='start_time',
            field=models.TimeField(auto_now_add=True),
        ),
    ]
