using CbrCurrencyApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CbrCurrencyApi.Controllers;

[Controller]
[Route("api/currencies")]
public class CurrenciesController : ControllerBase
{
    private readonly ILogger<CurrenciesController> _logger;
    private readonly CurrenciesService _service;

    public CurrenciesController(ILogger<CurrenciesController> logger, CurrenciesService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetCurrencies()
    {
        var curencies = await _service.GetAllAsync();
        return Ok(curencies);
    }
    

}
