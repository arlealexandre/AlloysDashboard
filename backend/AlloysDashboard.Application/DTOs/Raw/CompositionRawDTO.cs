namespace AlloysDashboard.Application.DTOs;
using System.Text.Json.Serialization;

public class CompositionRawDTO
{
    [JsonPropertyName("nominal")]
    public float? Nominal { get; set; }

    [JsonPropertyName("min")]
    public float? Min { get; set; }

    [JsonPropertyName("max")]
    public float? Max { get; set; }
}