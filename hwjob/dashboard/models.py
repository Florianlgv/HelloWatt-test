from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.urls import reverse
import statistics


class MonthMixin(models.Model):
    month = models.PositiveSmallIntegerField(
        "month", validators=[MinValueValidator(1), MaxValueValidator(12)]
    )
    year = models.PositiveSmallIntegerField("year")

    class Meta:
        abstract = True


class Client(models.Model):
    """
    Model representing a client, with methods for analyzing consumption data.
    """

    full_name = models.CharField("full name", max_length=50)

    def __str__(self):
        return f"Client {self.pk}"

    def get_last_12_months_consumption(self):
        return Consumption.objects.filter(client=self).order_by(
            "-year", "-month"
        )[:12:-1]

    def has_elec_heating(self):
        """
        Determines if the client uses electric heating based on consumption patterns.
        """
        try:
            winter_months = [1, 2, 12]
            non_winter_months = list(range(3, 12))
            winter_consumption = self.calculate_average_consumption(
                winter_months
            )
            non_winter_consumption = self.calculate_average_consumption(
                non_winter_months
            )

            winter_augmentation_rate = 1.4
            return (
                winter_consumption
                > winter_augmentation_rate * non_winter_consumption
            )
        except statistics.StatisticsError:
            return False

    def has_anomaly(self):
        try:
            consumptions = self.get_last_12_months_consumption()
            monthly_consumptions = [
                consumption.kwh_consumed for consumption in consumptions
            ]

            avg_consumption = statistics.mean(monthly_consumptions)
            std_dev = statistics.stdev(monthly_consumptions)

            malfunction_months = [
                monthly_consumptions.index(consumption.kwh_consumed)
                for consumption in consumptions
                if abs(consumption.kwh_consumed - avg_consumption)
                > 2 * std_dev
            ]

            return malfunction_months
        except statistics.StatisticsError:
            return []

    def calculate_average_consumption(self, months):
        consumptions = self.get_last_12_months_consumption()
        seasonal_consumption = [
            c.kwh_consumed for c in consumptions if c.month in months
        ]
        return statistics.mean(seasonal_consumption)


class Consumption(MonthMixin):
    """
    Store the electricity consumption of a client over a month
    """

    client = models.ForeignKey(
        "dashboard.Client", verbose_name="client", on_delete=models.CASCADE
    )
    kwh_consumed = models.FloatField("kwh consumed")

    class Meta:
        verbose_name = "Consumption"
        verbose_name_plural = "Consumptions"
        unique_together = ("client", "month", "year")

    def __str__(self):
        return f"Conso of {self.client} ({self.month}/{self.year}): {self.kwh_consumed}"

    def get_absolute_url(self):
        return f"/consumption/{self.pk}"


class ElectricityPrice(MonthMixin):
    """
    Store the electricity price during a month
    """

    cteuro_per_kwh = models.FloatField("price ct€/kwh")

    class Meta:
        verbose_name = "Electricity price"
        verbose_name_plural = "Electricity prices"
        unique_together = ("month", "year")

    def __str__(self):
        return f"Elec price ({self.month}/{self.year}): {self.cteuro_per_kwh}"
