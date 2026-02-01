namespace AlloysDashboard.Application.DTOs;

/// <summary>
/// Models an alloy dto
/// </summary>
public class AlloyDTO
{
    public required int Name { get; set; }
    public AlloyPropertiesDTO Properties { get; set; } = new();
    public ICollection<CompositionDTO> Compositions { get; set; } = new List<CompositionDTO>();
}