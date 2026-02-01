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

    public async Task<ListAlloysResponseDTO> ExecuteAsync()
    {
        var alloys = await _alloyRepository.ListAsync();
        return new ListAlloysResponseDTO { Alloys = alloys };
    }
}