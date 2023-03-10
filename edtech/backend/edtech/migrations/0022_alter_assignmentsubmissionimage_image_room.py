# Generated by Django 4.1.1 on 2022-11-05 21:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('edtech', '0021_alter_assignmentsubmissionimage_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignmentsubmissionimage',
            name='image',
            field=models.ImageField(upload_to='assignments/images'),
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('room_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('batch', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, to='edtech.batch')),
            ],
        ),
    ]
