using System.Text.Json;

public class CityRepository : ICityRepository {
    public WeatherDbContext _context;

    public CityRepository(WeatherDbContext context) {
        _context = context;
    }

    public void ImportFromJson(string jsonFilePath) {
        var json = File.ReadAllText(jsonFilePath);
        var data = JsonSerializer.Deserialize<List<JsonCity>>(json);

        if (data.Count == _context.Cities.Count()) {
            return;
        }

        foreach (var city in data) {
            City newCity = new City {
                Name = city.name,
                CountryName = city.country
            };
            Coordinates newCoordinates = new Coordinates {
                X = city.coords[0],
                Y = city.coords[1],
            };

            newCity.Coordinates = newCoordinates;
            _context.Add(newCity);
        }

        _context.SaveChanges();
    }

    private bool disposed = false;
}