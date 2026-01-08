using CbrCurrencyApi.Data;
using CbrCurrencyApi.Models;
using CbrCurrencyApi.Models.DTO_s;
using Microsoft.EntityFrameworkCore;

namespace CbrCurrencyApi.Services;

public class ExchangeRatesService
{
    private readonly ILogger<ExchangeRatesService> _logger;
    private readonly AppDbContext _context;
        
    public ExchangeRatesService(ILogger<ExchangeRatesService> logger, AppDbContext context)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<IReadOnlyList<ExchangeRateDto>> GetRatesByDateAsync(DateOnly date)
    {
        return await _context.ExchangeRates
            .AsNoTracking()
            .Where(x => x.Date == date)
            .OrderBy(x => x.Currency.NumCode)
            .Select(x => new ExchangeRateDto
            {
                Code = x.Currency.NumCode,
                Name = x.Currency.Name,
                Rate = x.Rate,
            })
            .ToListAsync();
    }


    public async Task<IReadOnlyList<ExchangeRateHistoryDto>> GetRateHistoryAsync(
        string currencyCode,
        DateOnly start,
        DateOnly end)
    {
        return await _context.ExchangeRates
            .AsNoTracking()
            .Where(x =>
                x.Currency.NumCode == currencyCode &&
                x.Date >= start &&
                x.Date <= end)
            .OrderBy(x => x.Date)
            .Select(x => new ExchangeRateHistoryDto
            {
                Date = x.Date,
                Rate = x.Rate,
            })
            .ToListAsync();
    }
}
