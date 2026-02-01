using AlloysDashboard.Application.UseCases;
using Microsoft.Extensions.DependencyInjection;

namespace LibraryManagementSystem.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddUseCases(this IServiceCollection services)
    {
        services.AddScoped<ListAlloysUseCase>();
        services.AddScoped<ImportAlloysUseCase>();

        return services;
    }
}