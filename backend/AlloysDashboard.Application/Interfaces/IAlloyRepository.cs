using AlloysDashboard.Application.DTOs;
using AlloysDashboard.Domain.Models;

namespace AlloysDashboard.Application.Interfaces;

public interface IAlloyRepository
{
    Task SeedFromListAsync(List<Alloy> alloys);
    Task<List<Alloy>> ListAsync(int page, int pageSize, string? productType, string? productShape);
    Task<int> GetTotalAlloysAsync(string? productType, string? productShape);
    Task<List<string>> GetProductTypeList();
    Task<List<string>> GetProductShapeList();
}