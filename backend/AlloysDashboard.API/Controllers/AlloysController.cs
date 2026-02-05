using AlloysDashboard.Application.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace AlloysDashboard.API.Controllers;

[ApiController]
[Route("api/alloys")]
public class AlloysController : ControllerBase
{
    private readonly ListAlloysUseCase _listAlloysUseCase;
    private readonly ImportAlloysUseCase _importAlloysUseCase;
    private readonly GetProductTypeListUseCase _getProductTypeListUseCase;
    private readonly GetProductShapeListUseCase _getProductShapeListUseCase;

    public AlloysController(
        ListAlloysUseCase listAlloysUseCase,
        ImportAlloysUseCase importAlloysUseCase,
        GetProductTypeListUseCase getProductTypeListUseCase,
        GetProductShapeListUseCase getProductShapeListUseCase
    )
    {
        _listAlloysUseCase = listAlloysUseCase;
        _importAlloysUseCase = importAlloysUseCase;
        _getProductTypeListUseCase = getProductTypeListUseCase;
        _getProductShapeListUseCase = getProductShapeListUseCase;
    }

    [HttpGet("productTypes")]
    public async Task<IActionResult> GetProductTypeList()
    {
        try
        {
            var result = await _getProductTypeListUseCase.ExecuteAsync();
            return Ok(result);
        }
        catch (Exception)
        {
            return StatusCode(500, new { errorMessage = "Failed to retrieve product types."});
        }
    }

    [HttpGet("productShapes")]
    public async Task<IActionResult> GetProductShapeList()
    {
        try
        {
            var result = await _getProductShapeListUseCase.ExecuteAsync();
            return Ok(result);
        }
        catch (Exception)
        {
            return StatusCode(500, new { errorMessage = "Failed to retrieve product types."});
        }
    }

    [HttpGet]
    public async Task<IActionResult> ListAlloys(int page = 1, int pageSize = 50, string? productType = null, string? productShape = null)
    {
        try
        {
            var result = await _listAlloysUseCase.ExecuteAsync(page, pageSize, productType, productShape);
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