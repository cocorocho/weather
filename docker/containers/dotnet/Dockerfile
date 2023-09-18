FROM python:3.11.5-slim as py-build

RUN apt update

# GDAL Deps
RUN apt install binutils libproj-dev gdal-bin libsqlite3-mod-spatialite -y

COPY geodata/geodjango /code/geodjango
# COPY docker/containers/geodata/entrypoint.sh /
# RUN chmod +x /entrypoint.sh

WORKDIR /code/geodjango

RUN pip install -r requirements.txt
RUN python manage.py migrate --no-input
RUN python manage.py dumpcities

# Dotnet build
FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine as dotnet-build

WORKDIR /code

COPY ./api .
COPY --from=py-build /code/geodjango/cities.json /code/api/Database

RUN dotnet restore
RUN dotnet publish -c Release -o /dist

# Dotnet runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine

WORKDIR /code

COPY --from=dotnet-build /dist .

CMD ["dotnet", "api.dll"]
