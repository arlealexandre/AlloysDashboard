using AlloysDashboard.Application.Interfaces;
using AlloysDashboard.Domain.Models;
using AlloysDashboard.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace AlloysDashboard.Infrastructure.Repositories;

public class AlloyRepository : IAlloyRepository
{

    private readonly AppDbContext _context;

    public AlloyRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<int> GetTotalAlloysAsync()
    {
        return await _context.Alloys.CountAsync();
    }

    public async Task<List<Alloy>> ListAsync(int page, int pageSize)
    {
        return await _context.Alloys
            .AsNoTracking()
            .Include(a => a.Compositions)
            .Skip((page - 1) * pageSize)
            .Take(pageSize).ToListAsync();
    }

    public async Task SeedFromListAsync(List<Alloy> alloys)
    {
        await _context.Database.EnsureCreatedAsync();

        _context.Compositions.RemoveRange(_context.Compositions);
        _context.Alloys.RemoveRange(_context.Alloys);
        _context.ChemicalElements.RemoveRange(_context.ChemicalElements);

        var elementCache = await _context.ChemicalElements.ToDictionaryAsync(e => e.Symbol);

        foreach (var alloy in alloys)
        {
            foreach (var comp in alloy.Compositions)
            {
                if (elementCache.TryGetValue(comp.ChemicalElement.Symbol, out var existingElement))
                {
                    comp.ChemicalElement = existingElement;
                }
                else
                {
                    elementCache.Add(comp.ChemicalElement.Symbol, comp.ChemicalElement);
                }
            }

            _context.Alloys.Add(alloy);
        }

        await _context.SaveChangesAsync();
    }
}