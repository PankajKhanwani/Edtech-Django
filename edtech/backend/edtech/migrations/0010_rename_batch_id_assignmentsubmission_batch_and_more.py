# Generated by Django 4.1.1 on 2022-10-27 15:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('edtech', '0009_assignmentsubmission_assignments'),
    ]

    operations = [
        migrations.RenameField(
            model_name='assignmentsubmission',
            old_name='batch_id',
            new_name='batch',
        ),
        migrations.RenameField(
            model_name='assignmentsubmission',
            old_name='student_id',
            new_name='student',
        ),
    ]
