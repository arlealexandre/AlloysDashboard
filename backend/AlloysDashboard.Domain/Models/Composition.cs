namespace AlloysDashboard.Domain.Models;

/// <summary>
/// Models a chemical element composition
/// </summary>
public class Composition
{
    public required int AlloyName { get; set; }
    public required Alloy Alloy { get; set; }
    public required string ChemicalElementSymbol { get; set; }
    public required ChemicalElement ChemicalElement { get; set; }

    public float? Nominal { get; set; }
    public float? Min { get; set; }
    public float? Max { get; set; }
}