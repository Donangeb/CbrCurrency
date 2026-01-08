using CbrCurrencyApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CbrCurrencyApi.Controllers;

[Route("api/stats")]
[ApiController]
public class StatsController : ControllerBase
{
    private readonly StatsService _service;

    public StatsController(StatsService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetStats()
    {
        var stats = await _service.GetStatsAsync();
        return Ok(stats);
    }
}