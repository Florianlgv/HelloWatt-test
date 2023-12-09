from rest_framework.test import APITestCase
from rest_framework import status

from django.test import Client as DjClient
from django.test import TestCase
from django.urls import reverse

from dashboard.models import Client
from django.test import TestCase
from dashboard.models import Client, Consumption
import datetime


class DashBoardTestCase(TestCase):
    fixtures = ["prices", "clients", "consumptions"]


class HttpCodeTestCase(DashBoardTestCase):
    def setUp(self):
        self.djclient = DjClient()

    def assertGet(self, path):
        response = self.djclient.get(path)
        self.assertSuccess(response, f"{path}")

    # def test_clients_list_view(self):
    #     path = reverse("dashboard:clients_list")
    #     self.assertGet(path)


class ClientModelTestCase(TestCase):
    def setUp(self):
        self.client = Client.objects.create(full_name="Fictive Client")

        for month in range(1, 13):
            Consumption.objects.create(
                client=self.client,
                month=month,
                year=datetime.datetime.now().year,
                kwh_consumed=100 * month,
            )

    def test_get_last_12_months_consumption(self):
        consumptions = self.client.get_last_12_months_consumption()
        self.assertEqual(len(consumptions), 12)

    def test_has_elec_heating(self):
        self.assertFalse(self.client.has_elec_heating())

    def test_has_anomaly(self):
        anomalies = self.client.has_anomaly()
        self.assertIsInstance(anomalies, list)

    def test_calculate_average_consumption(self):
        avg_consumption = self.client.calculate_average_consumption([1, 2, 12])
        self.assertTrue(avg_consumption > 0)


class ClientConsumptionDetailViewTest(APITestCase):
    def setUp(self):
        self.test_client = Client.objects.create(full_name="Test Client")
        for month in range(1, 13):
            Consumption.objects.create(
                client=self.test_client,
                month=month,
                year=datetime.date.today().year,
                kwh_consumed=100 * month,
            )

    def test_consumption_detail_existing_client(self):
        url = reverse(
            "dashboard:client_consumption_detail",
            kwargs={"client_id": self.test_client.id},
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertIn("consumptions", response.data)
        self.assertIn("has_electric_heating", response.data)
        self.assertIn("anomalies_index", response.data)

    def test_consumption_detail_non_existing_client(self):
        non_existing_client_id = self.test_client.id + 1
        url = reverse(
            "dashboard:client_consumption_detail",
            kwargs={"client_id": non_existing_client_id},
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
