namespace CbrCurrencyApi.Models.DTO_s;

public class ExchangeRateDto
{
    public string Code { get; set; } = null!;
    public string Name { get; set; } = null!;
    public decimal Rate { get; set; }
}
