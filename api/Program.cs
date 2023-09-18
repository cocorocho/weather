using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;

var builder = WebApplication.CreateBuilder(args);

// Vars
var weatherApiURL = builder.Configuration["Urls:weatherApiURL"];

// Database
var connectionString = builder.Configuration.GetConnectionString("geoDB");
builder.Services.AddDbContext<WeatherDbContext>(options => options.UseSqlite(connectionString));

// Cors
var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
string? clientURL = builder.Configuration["Urls:clientURL"];
string? clientPort = builder.Configuration["Urls:clientPort"];

builder.Services.AddCors(options => {
    options.AddPolicy(MyAllowSpecificOrigins, policy => {
        policy.WithOrigins($"http://{clientURL}:{clientPort}");
    });
});

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

if (!app.Environment.IsDevelopment()) {
    // app.UseHttpsRedirection();
}

using (var scope = app.Services.CreateScope())
{
    var serviceProvider = scope.ServiceProvider;
    var dbContext = serviceProvider.GetRequiredService<WeatherDbContext>();

    if (!app.Environment.IsDevelopment()) {
        await dbContext.Database.MigrateAsync();
        await dbContext.Database.EnsureCreatedAsync();
    }

    var repo = new CityRepository(dbContext);
    repo.ImportFromJson("./Database/cities.json");
}

app.MapGet("/q", async (WeatherDbContext db, string city) => {
    return await db.Cities
        .Where(c => c.Name.ToLower().Contains(city.ToLower()))
        .Include(c => c.Coordinates)
        .ToListAsync();
});

app.MapGet("/forecast", async (double latitude, double longitude, string timezone) => {
    using (var client = new HttpClient()) {
        string[] dailyForecastParams = {
            "temperature_2m_min",
            "temperature_2m_max",
            "apparent_temperature_max",
            "apparent_temperature_min",
            "rain_sum"
        };
        string[] hourlyForecastParams = {
            "relativehumidity_2m"
        };

        var queryParams = new [] {
            // Required
            new KeyValuePair<string, string>("latitude", latitude.ToString()),
            new KeyValuePair<string, string>("longitude", longitude.ToString()),
            new KeyValuePair<string, string>("timezone", timezone),
            // Default
            new KeyValuePair<string, string>("daily", new StringValues(dailyForecastParams)),
            new KeyValuePair<string, string>("hourly", new StringValues(hourlyForecastParams)),
            new KeyValuePair<string, string>("current_weather", "true"),
        };
        var uri = QueryHelpers.AddQueryString(weatherApiURL, queryParams);
        var response = await client.GetAsync(uri);
        response.EnsureSuccessStatusCode();

        string responseString = await response.Content.ReadAsStringAsync();
        var jsonData = JsonSerializer.Deserialize<JsonObject>(responseString);
        return jsonData;
    };
});

app.Run();
