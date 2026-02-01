using AlloysDashboard.Application.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace AlloysDashboard.API.Controllers;

[ApiController]
[Route("api/alloys")]
public class AlloysController : ControllerBase
{
    private readonly ListAlloysUseCase _listAlloysUseCase;
    private readonly ImportAlloysUseCase _importAlloysUseCase;

    public AlloysController(
        ListAlloysUseCase listAlloysUseCase,
        ImportAlloysUseCase importAlloysUseCase
    )
    {
        _listAlloysUseCase = listAlloysUseCase;
        _importAlloysUseCase = importAlloysUseCase;
    }

    [HttpGet("alloys")]
    public async Task<IActionResult> ListAlloys(int page = 1, int pageSize = 50)
    {
        try
        {
            var result = await _listAlloysUseCase.ExecuteAsync(page, pageSize);
            return Ok(result);
        }
        catch (Exception)
        {
            return StatusCode(500, new { errorMessage = "Failed to retrieve alloys."});
        }
    }

    [HttpPost("upload-json")]
    public async Task<IActionResult> UploadAlloys(IFormFile file)
    {
        if (file == null || file.Length == 0) return BadRequest("Invalid file.");

        using var stream = file.OpenReadStream();

        try
        {
            await _importAlloysUseCase.ExecuteAsync(stream);
            return Ok();
        }
        catch (Exception)
        {
            return StatusCode(500, $"Error occurred during import.");
        }
    }
}