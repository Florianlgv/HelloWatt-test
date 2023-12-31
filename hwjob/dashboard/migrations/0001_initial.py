# Generated by Django 2.2.7 on 2019-11-24 17:22

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Client",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "full_name",
                    models.CharField(max_length=50, verbose_name="full name"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ElectricityPrice",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "month",
                    models.PositiveSmallIntegerField(
                        validators=[
                            django.core.validators.MinValueValidator(1),
                            django.core.validators.MaxValueValidator(12),
                        ],
                        verbose_name="month",
                    ),
                ),
                ("year", models.PositiveSmallIntegerField(verbose_name="year")),
                ("cteuro_per_kwh", models.FloatField(verbose_name="price ct€/kwh")),
            ],
            options={
                "verbose_name": "Electricity price",
                "verbose_name_plural": "Electricity prices",
                "unique_together": {("month", "year")},
            },
        ),
        migrations.CreateModel(
            name="Consumption",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "month",
                    models.PositiveSmallIntegerField(
                        validators=[
                            django.core.validators.MinValueValidator(1),
                            django.core.validators.MaxValueValidator(12),
                        ],
                        verbose_name="month",
                    ),
                ),
                ("year", models.PositiveSmallIntegerField(verbose_name="year")),
                ("kwh_consumed", models.FloatField(verbose_name="kwh consumed")),
                (
                    "client",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="dashboard.Client",
                        verbose_name="client",
                    ),
                ),
            ],
            options={
                "verbose_name": "Consumption",
                "verbose_name_plural": "Consumptions",
                "unique_together": {("client", "month", "year")},
            },
        ),
    ]
