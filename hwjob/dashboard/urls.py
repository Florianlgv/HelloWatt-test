from django.urls import path

from dashboard.views import (
    consumption_view,
    ClientConsumptionDetailView,
)

app_name = "dashboard"
urlpatterns = [
    path("conso/<int:client_id>/", ClientConsumptionDetailView.as_view()),
]
