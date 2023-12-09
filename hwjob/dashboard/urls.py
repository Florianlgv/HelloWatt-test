from django.urls import path

from dashboard.views import (
    ClientConsumptionDetailView,
    CheckClientExistView,
    SearchClientView,
)

app_name = "dashboard"
urlpatterns = [
    path("conso/<int:client_id>/", ClientConsumptionDetailView.as_view()),
    path("check-client/", CheckClientExistView.as_view()),
    path("search-client/", SearchClientView.as_view()),
]
