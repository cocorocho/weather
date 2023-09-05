using System.ComponentModel.DataAnnotations;

public class Coordinates {
    [Key]
    public int Id { get; set; }
    [Required]
    public double X { get; set; }
    [Required]
    public double Y { get; set; }
    public int CityId { get; set; }
}