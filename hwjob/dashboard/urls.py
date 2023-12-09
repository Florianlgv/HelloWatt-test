from django.urls import path
from dashboard.views import (
    ClientConsumptionDetailView,
    CheckClientExistView,
    SearchClientView,
)

app_name = "dashboard"
urlpatterns = [
    path(
        "conso/<int:client_id>/",
        ClientConsumptionDetailView.as_view(),
        name="client_consumption_detail",
    ),
    path(
        "check-client/",
        CheckClientExistView.as_view(),
        name="check_client_exist",
    ),
    path("search-client/", SearchClientView.as_view(), name="search_client"),
]
