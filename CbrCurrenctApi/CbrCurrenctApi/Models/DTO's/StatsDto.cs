namespace CbrCurrencyApi.Models.DTO_s;

public class StatsDto
{
    public int CurrenciesCount { get; set; }
    public int RatesCount { get; set; }
    public DateOnly FirstDate { get; set; }
    public DateOnly LastDate { get; set; }
}
