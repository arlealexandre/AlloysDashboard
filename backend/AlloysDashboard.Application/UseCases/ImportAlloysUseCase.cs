using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using AlloysDashboard.Application.DTOs;
using AlloysDashboard.Application.Interfaces;
using AlloysDashboard.Domain.Models;

namespace AlloysDashboard.Application.UseCases;

public class ImportAlloysUseCase
{
    private readonly IAlloyRepository _alloyRepository;

    public ImportAlloysUseCase(IAlloyRepository alloyRepository)
    {
        _alloyRepository = alloyRepository;
    }

    public async Task ExecuteAsync(Stream stream)
    {

        var alloysDto = await JsonSerializer.DeserializeAsync<List<AlloyRawDTO>>(stream, new JsonSerializerOptions 
        { 
            PropertyNameCaseInsensitive = true,
            NumberHandling = JsonNumberHandling.AllowReadingFromString
        });

        if (alloysDto == null) return;

        var alloys = alloysDto.Select(dto =>
        {
            var alloy = new Alloy
            {
                Name = dto.AlloyName,
                Properties = new AlloyProperties
                {
                    ProductThickness = SafeParse(dto.Properties.ProductThickness),
                    ProductType = dto.Properties.ProductType != null ? dto.Properties.ProductType : null,
                    ProductShape = dto.Properties.ProductShape != null ? dto.Properties.ProductShape : null,
                    LDirectionTys = SafeParse(dto.Properties.LDirectionTys),
                    AgingStep1Temp = SafeParse(dto.Properties.AgingStep1Temp),
                    AgingStep1Time = SafeParse(dto.Properties.AgingStep1Time),
                    HomoStep1Temp = SafeParse(dto.Properties.HomoStep1Temp),
                    HomoStep1Time = SafeParse(dto.Properties.HomoStep1Time),
                    HotProcessStep1TIn = SafeParse(dto.Properties.HotProcessStep1TIn),
                    CastingTechnology = dto.Properties.CastingTechnology != null ? dto.Properties.CastingTechnology : null
                }
            };

            alloy.Compositions = dto.Compositions.Select(c => new Composition
            {
                Alloy = alloy,
                ChemicalElement = new ChemicalElement { Symbol = c.Key },
                ChemicalElementSymbol = c.Key,
                AlloyName = dto.AlloyName,
                Nominal = c.Value.Nominal,
                Min = c.Value.Min,
                Max = c.Value.Max
            }).ToList();

            return alloy;
        }).ToList();

        await _alloyRepository.SeedFromListAsync(alloys);
    }

    private float? SafeParse(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return null;

        // Setting point '.' as separator
        if (float.TryParse(value, NumberStyles.Any, CultureInfo.InvariantCulture, out var result))
        {
            return result;
        }

        return null;
    }
}