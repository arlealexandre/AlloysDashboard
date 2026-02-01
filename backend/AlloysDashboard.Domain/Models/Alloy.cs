namespace AlloysDashboard.Domain.Models;

/// <summary>
/// Models an alloy
/// </summary>
public class Alloy
{
    public required int Name { get; set; }
    public required AlloyProperties Properties { get; set; }
    public ICollection<Composition> Compositions { get; set; } = new List<Composition>();
}