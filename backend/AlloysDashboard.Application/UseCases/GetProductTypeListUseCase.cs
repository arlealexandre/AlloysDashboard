using AlloysDashboard.Application.DTOs;
using AlloysDashboard.Application.Interfaces;

namespace AlloysDashboard.Application.UseCases;

public class GetProductTypeListUseCase
{
    private readonly IAlloyRepository _alloyRepository;

    public GetProductTypeListUseCase(IAlloyRepository alloyRepository)
    {
        _alloyRepository = alloyRepository;
    }

    public async Task<GetProductTypeListResponseDTO> ExecuteAsync()
    {
        var productTypeList = await _alloyRepository.GetProductTypeList();

        var productTypes = productTypeList.Count() > 0 ? productTypeList : new List<string>();

        return new GetProductTypeListResponseDTO { 
            ProductTypes = productTypes
        };
    }
}