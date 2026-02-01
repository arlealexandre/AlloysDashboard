namespace AlloysDashboard.Application.DTOs;
using System.Text.Json.Serialization;


public class AlloyPropertiesRawDTO
{
    [JsonPropertyName("product_thickness")]
    public string? ProductThickness { get; set; }

    [JsonPropertyName("product_type")]
    public string? ProductType { get; set; }

    [JsonPropertyName("product_shape")]
    public string? ProductShape { get; set; }

    [JsonPropertyName("l_direction_tys")]
    public string? LDirectionTys { get; set; }

    [JsonPropertyName("aging_step_1_temp")]
    public string? AgingStep1Temp { get; set; }

    [JsonPropertyName("aging_step_1_time")]
    public string? AgingStep1Time { get; set; }

    [JsonPropertyName("homo_step_1_temp")]
    public string? HomoStep1Temp { get; set; }

    [JsonPropertyName("homo_step_1_time")]
    public string? HomoStep1Time { get; set; }

    [JsonPropertyName("hot_process_step_1_t_in")]
    public string? HotProcessStep1TIn { get; set; }

    [JsonPropertyName("casting_technology")]
    public string? CastingTechnology { get; set; }
}