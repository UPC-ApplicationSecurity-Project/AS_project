# Generated by Django 5.1.3 on 2024-11-09 22:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_rename_newuser1_newuser'),
    ]

    operations = [
        migrations.CreateModel(
            name='post',
            fields=[
                ('post_id', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=30)),
                ('body', models.TextField(blank=True)),
                ('status', models.CharField(choices=[('Private', 'Private'), ('Public', 'Public')], default='Public', max_length=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.newuser')),
            ],
        ),
    ]
