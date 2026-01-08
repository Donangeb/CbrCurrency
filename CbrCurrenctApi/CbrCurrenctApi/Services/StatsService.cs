using CbrCurrencyApi.Data;
using CbrCurrencyApi.Models.DTO_s;
using Microsoft.EntityFrameworkCore;

namespace CbrCurrencyApi.Services;

public class StatsService
{
    private readonly AppDbContext _context;

    public StatsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<StatsDto> GetStatsAsync()
    {
        return new StatsDto
        {
            CurrenciesCount = await _context.Currencies.CountAsync(),
            RatesCount = await _context.ExchangeRates.CountAsync(),
            FirstDate = await _context.ExchangeRates.MinAsync(x => x.Date),
            LastDate = await _context.ExchangeRates.MaxAsync(x => x.Date)
        };
    }
}
