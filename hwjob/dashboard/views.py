from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from dateutil.relativedelta import relativedelta
from .models import Consumption, Client
from .serializers import ConsumptionSerializer


class ClientConsumptionDetailView(APIView):
    def get(self, request, client_id):
        try:
            client = Client.objects.get(pk=client_id)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=404)

        consumptions = client.get_last_12_months_consumption()
        parsed_consumptions = {
            "year": {c.year for c in consumptions},
            "months": [c.month for c in consumptions],
            "kwh_consumed": [c.kwh_consumed for c in consumptions],
        }

        has_heating = client.has_elec_heating()
        anomaly_index = client.has_anomaly()

        response_data = {
            "consumptions": parsed_consumptions,
            "has_electric_heating": has_heating,
            "anomalies": anomaly_index,
        }

        return Response(response_data)


def consumption_view(request, client_id):
    return render(request, "dashboard/consumption_detail.html")


def search_client_view(request):
    """
    A list of clients

    TODO client.has_elec_heating should be set
    TODO client.has_anomaly should be set
    """
    return render(request, "dashboard/search_client.html")
