namespace AlloysDashboard.Domain.Models;

/// <summary>
/// Models an alloy
/// </summary>
public class Alloy
{
    public required int Name;
    public required AlloyProperties Properties;
    public IEnumerable<Composition> Compositions = new List<Composition>();
}