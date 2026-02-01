namespace AlloysDashboard.Domain.Models;

/// <summary>
/// Models an alloy
/// </summary>
public class Alloy
{
    public required int Name { get; set; }
    public AlloyProperties Properties { get; set; } = new();
    public ICollection<Composition> Compositions { get; set; } = new List<Composition>();
}