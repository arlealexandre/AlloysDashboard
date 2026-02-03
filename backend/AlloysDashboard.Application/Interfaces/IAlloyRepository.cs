using AlloysDashboard.Application.DTOs;
using AlloysDashboard.Domain.Models;

namespace AlloysDashboard.Application.Interfaces;

public interface IAlloyRepository
{
    Task SeedFromListAsync(List<Alloy> alloys);
    Task<List<Alloy>> ListAsync(int page, int pageSize);
    Task<int> GetTotalAlloysAsync();
}