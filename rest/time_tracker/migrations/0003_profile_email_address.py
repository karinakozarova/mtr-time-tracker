# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-19 14:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('time_tracker', '0002_auto_20160719_0922'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='email_address',
            field=models.EmailField(max_length=254, null=True, unique=True, verbose_name='Email address'),
        ),
    ]
