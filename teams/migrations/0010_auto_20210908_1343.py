# Generated by Django 3.2.4 on 2021-09-08 13:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_auto_20210826_0721'),
        ('teams', '0009_auto_20210908_1341'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invitation',
            name='company',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='invitations', to='core.fleet'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='member',
            name='company',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='members', to='core.fleet'),
            preserve_default=False,
        ),
    ]
