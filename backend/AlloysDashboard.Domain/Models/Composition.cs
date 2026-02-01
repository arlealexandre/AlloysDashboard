namespace AlloysDashboard.Domain.Models;

/// <summary>
/// Models a chemical element composition
/// </summary>
public class Composition
{
    public required ChemicalElement ChemicalElement;
    public required float Nominal;
    public float? Min;
    public float? Max;
}