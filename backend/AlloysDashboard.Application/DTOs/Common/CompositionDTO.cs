namespace AlloysDashboard.Application.DTOs;

/// <summary>
/// Models a chemical element composition dto
/// </summary>
public class CompositionDTO
{
    public required string ChemicalElementSymbol { get; set; }
    public float? Nominal { get; set; }
    public float? Min { get; set; }
    public float? Max { get; set; }
}