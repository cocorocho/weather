import json
from typing import Any

from django.core.management.base import BaseCommand, CommandParser

from cities.models import City


class Command(BaseCommand):
    help = "Dump cities data with minimal data as json"

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("--file-name", default="cities.json", help="dump file name. JSON")

    def handle(self, *args: Any, **options: Any) -> str | None:
        file = options.get("file_name")
        data = []

        queryset = City.objects.select_related("country")

        for city in queryset:
            data.append({
                "name": city.name,
                "country": city.country.name,
                "coords": [city.location.x, city.location.y] # x, y
            })

        with open(file, encoding="utf8", mode="w") as f:
            json.dump(data, f, ensure_ascii=False)
