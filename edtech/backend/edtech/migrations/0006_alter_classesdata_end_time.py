# Generated by Django 4.1.1 on 2022-10-25 20:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edtech', '0005_alter_classesdata_start_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classesdata',
            name='end_time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
