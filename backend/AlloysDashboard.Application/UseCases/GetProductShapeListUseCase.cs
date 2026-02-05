using AlloysDashboard.Application.DTOs;
using AlloysDashboard.Application.Interfaces;

namespace AlloysDashboard.Application.UseCases;

public class GetProductShapeListUseCase
{
    private readonly IAlloyRepository _alloyRepository;

    public GetProductShapeListUseCase(IAlloyRepository alloyRepository)
    {
        _alloyRepository = alloyRepository;
    }

    public async Task<GetProductShapeListResponseDTO> ExecuteAsync()
    {
        var productShapeList = await _alloyRepository.GetProductShapeList();

        var productShapes = productShapeList.Count() > 0 ? productShapeList : new List<string>();

        return new GetProductShapeListResponseDTO { 
            ProductShapes = productShapes
        };
    }
}