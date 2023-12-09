from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone

from .models import Consumption, Client
from .serializers import ConsumptionSerializer, ClientSerializer

from dateutil.relativedelta import relativedelta


class ClientConsumptionDetailView(APIView):
    """
    API view to handle requests for a client's consumption details.
    """

    def get(self, request, client_id):
        """
        Handle GET request to retrieve consumption details for a given client.
        Parameters:
            - request: HttpRequest object
            - client_id: ID of the client
        Returns a JSON response with consumption details or error message.
        """
        try:
            client = Client.objects.get(pk=client_id)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"}, status=404)

        consumptions = client.get_last_12_months_consumption()
        parsed_consumptions = {
            "year": {consumptions[0].year, consumptions[-1].year},
            "months": [c.month for c in consumptions],
            "kwh_consumed": [c.kwh_consumed for c in consumptions],
        }

        has_heating = client.has_elec_heating()
        anomalies_index = client.has_anomaly()

        response_data = {
            "consumptions": parsed_consumptions,
            "has_electric_heating": has_heating,
            "anomalies_index": anomalies_index,
        }

        return Response(response_data)


class CheckClientExistView(APIView):
    """
    API view to check if a client exists based on a search query.
    """

    def get(self, request, format=None):
        search_input = request.query_params.get("query", None)
        if search_input is None:
            return Response({"error": "No search input provided"}, status=400)

        try:
            client = Client.objects.get(pk=int(search_input))
        except (ValueError, Client.DoesNotExist):
            client = Client.objects.filter(
                full_name__icontains=search_input
            ).first()
            if client is None:
                return Response({"error": "Client not found"}, status=404)

        return Response({"client_id": client.id})


class SearchClientView(APIView):
    """
    API view to search for clients based on a query.
    """

    def get(self, request, format=None):
        """
        Handle GET request to search for clients.
        Parameters:
            - request: HttpRequest object
        Returns a JSON response with a list of clients or an empty list.
        """
        search_input = request.query_params.get("query", None)
        if search_input is None:
            return Response([])

        clients = Client.objects.filter(full_name__icontains=search_input)[:5]
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)
