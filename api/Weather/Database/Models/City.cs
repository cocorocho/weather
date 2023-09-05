using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

public class City {
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string CountryName { get; set; }
    public Coordinates? Coordinates { get; set; }
}


public class JsonCity {
    public string name { get; set; }
    public string country { get; set; }
    public double[] coords { get; set; }
}
