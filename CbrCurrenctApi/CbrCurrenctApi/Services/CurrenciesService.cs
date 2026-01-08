using CbrCurrencyApi.Data;
using CbrCurrencyApi.Models.DTO_s;
using Microsoft.EntityFrameworkCore;

namespace CbrCurrencyApi.Services;

public class CurrenciesService
{
    private readonly AppDbContext _context;

    public CurrenciesService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<CurrencyDto>> GetAllAsync()
    {
        return await _context.Currencies
            .AsNoTracking()
            .OrderBy(x => x.NumCode)
            .Select(x => new CurrencyDto
            {
                Code = x.NumCode,
                Name = x.Name,
            })
            .ToListAsync();
    }

}
