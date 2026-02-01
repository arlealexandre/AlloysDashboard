using AlloysDashboard.Application.DTOs;
using AlloysDashboard.Application.Interfaces;

namespace AlloysDashboard.Application.UseCases;

public class ListAlloysUseCase
{
    private readonly IAlloyRepository _alloyRepository;

    public ListAlloysUseCase(IAlloyRepository alloyRepository)
    {
        _alloyRepository = alloyRepository;
    }

    public async Task<ListAlloysResponseDTO> ExecuteAsync(int page, int pageSize)
    {
        var alloysFromModel = await _alloyRepository.ListAsync(page, pageSize);

        var alloysDto = alloysFromModel.Select(alloy =>
        {
            var alloyDto = new AlloyDTO
            {
                Name = alloy.Name,
                Properties = new AlloyPropertiesDTO
                {
                    ProductShape = alloy.Properties.ProductShape,
                    ProductThickness = alloy.Properties.ProductThickness,
                    ProductType = alloy.Properties.ProductType,
                    AgingStep1Temp = alloy.Properties.AgingStep1Temp,
                    AgingStep1Time = alloy.Properties.AgingStep1Time,
                    CastingTechnology = alloy.Properties.CastingTechnology,
                    HomoStep1Temp = alloy.Properties.HomoStep1Temp,
                    HomoStep1Time = alloy.Properties.HomoStep1Time,
                    HotProcessStep1TIn = alloy.Properties.HotProcessStep1TIn,
                    LDirectionTys = alloy.Properties.LDirectionTys,
                }
            };

            var compositionsDto = alloy.Compositions.Select(composition =>
            {
                var compositionDto = new CompositionDTO
                {
                    ChemicalElementSymbol = composition.ChemicalElementSymbol,
                    Nominal = composition.Nominal,
                    Min = composition.Min,
                    Max = composition.Max
                };

                return compositionDto;
            }).ToList();

            alloyDto.Compositions = compositionsDto;

            return alloyDto;
        }).ToList();

        return new ListAlloysResponseDTO { Alloys = alloysDto };
    }
}