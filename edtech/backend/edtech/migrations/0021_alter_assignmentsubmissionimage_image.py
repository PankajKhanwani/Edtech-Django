# Generated by Django 4.1.1 on 2022-11-04 22:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edtech', '0020_alter_assignmentsubmissionimage_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignmentsubmissionimage',
            name='image',
            field=models.ImageField(default=False, upload_to='assignments/images'),
        ),
    ]
