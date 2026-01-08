using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CbrCurrencyApi.Models;

/// <summary>
/// Курсы валют по датам
/// </summary>

[Table("exchange_rates")]
public class ExchangeRate
{

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("date")]
    public DateOnly Date { get; set; }

    [Required]
    [Column("currency_id")]
    public int CurrencyId { get; set; }

    [Required]
    [Column("rate", TypeName = "decimal(18,6)")]
    public decimal Rate { get; set; }

    [Column("loaded_at")]
    public DateTime LoadedAt { get; set; }

    [ForeignKey(nameof(CurrencyId))]
    public virtual Currency Currency { get; set; } = null!;
}
