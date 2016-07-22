# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-07-22 14:29
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('time_tracker', '0008_auto_20160720_1525'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timereport',
            name='date',
            field=models.DateField(default=django.utils.timezone.now, null=True, verbose_name='Date'),
        ),
    ]