using AlloysDashboard.Domain.Models;

namespace AlloysDashboard.Application.DTOs;

public class ListAlloysResponseDTO
{
    public List<AlloyDTO> Alloys { get; set; } = new();
}