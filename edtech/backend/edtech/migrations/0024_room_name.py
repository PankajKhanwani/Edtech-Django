# Generated by Django 4.1.1 on 2022-11-05 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edtech', '0023_student_group'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='name',
            field=models.CharField(default='6362ee2fe08863a3f2fa68df', max_length=100),
            preserve_default=False,
        ),
    ]
