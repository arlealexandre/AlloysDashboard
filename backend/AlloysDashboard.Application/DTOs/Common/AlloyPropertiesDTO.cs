namespace AlloysDashboard.Application.DTOs;

/// <summary>
/// Models a alloy properties dto
/// </summary>
public class AlloyPropertiesDTO
{
    public float? ProductThickness { get; set; }
    public string? ProductType { get; set; }
    public string? ProductShape { get; set; }
    public float? LDirectionTys { get; set; }
    public float? AgingStep1Temp { get; set; }
    public float? AgingStep1Time { get; set; }
    public float? HomoStep1Temp { get; set; }
    public float? HomoStep1Time { get; set; }
    public float? HotProcessStep1TIn { get; set; }
    public string? CastingTechnology { get; set; }
}