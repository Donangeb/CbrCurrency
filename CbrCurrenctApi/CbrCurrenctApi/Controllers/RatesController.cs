using CbrCurrencyApi.Models;
using CbrCurrencyApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CbrCurrencyApi.Controllers;

[Route("api/rates")]
[ApiController]
public class RatesController : ControllerBase
{
    private readonly ILogger<RatesController> _logger;
    private readonly ExchangeRatesService _service;


    public RatesController(ILogger<RatesController> logger, ExchangeRatesService rateService)
    {
        _logger = logger;
        _service = rateService;
    }

    [HttpGet]
    public async Task<IActionResult> GetRates([FromQuery] DateOnly date)
    {
        var rates = await _service.GetRatesByDateAsync(date);
        return Ok(rates);
    }

    [HttpGet("history")]
    public async Task<IActionResult> GetHistory(
    [FromQuery] string code,
    [FromQuery] DateOnly from,
    [FromQuery] DateOnly to)
    {
        var history = await _service.GetRateHistoryAsync(code, from, to);
        return Ok(history);
    }

}
