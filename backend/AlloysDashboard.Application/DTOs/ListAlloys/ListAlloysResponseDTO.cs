using AlloysDashboard.Domain.Models;

namespace AlloysDashboard.Application.DTOs;

public class ListAlloysResponseDTO
{
    public required int TotalCount  { get; set; }
    public List<AlloyDTO> Alloys { get; set; } = new();
}