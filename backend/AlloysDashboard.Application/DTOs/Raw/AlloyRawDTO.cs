namespace AlloysDashboard.Application.DTOs;
using System.Text.Json.Serialization;

public class AlloyRawDTO
{
    [JsonPropertyName("alloy_name")]
    public int AlloyName { get; set; }

    [JsonPropertyName("comp")]
    public Dictionary<string, CompositionRawDTO> Compositions { get; set; } = new();

    [JsonPropertyName("prop")]
    public AlloyPropertiesRawDTO Properties { get; set; } = new();
}