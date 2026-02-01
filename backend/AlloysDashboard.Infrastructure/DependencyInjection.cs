using AlloysDashboard.Application.Interfaces;
using AlloysDashboard.Infrastructure.Database;
using AlloysDashboard.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AlloysDashboard.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string? connectionString)
    {

        services.AddDbContext<AppDbContext>(options => options.UseSqlite(connectionString));

        services.AddScoped<IAlloyRepository, AlloyRepository>();
        
        return services;
    }
}