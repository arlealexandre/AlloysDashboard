using AlloysDashboard.Application.Interfaces;

namespace AlloysDashboard.Application.UseCases;

public class ListAlloysUseCase
{
    private readonly IAlloyRepository _alloyRepository;

    public ListAlloysUseCase(IAlloyRepository alloyRepository)
    {
        _alloyRepository = alloyRepository;
    }
}