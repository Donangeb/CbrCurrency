using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CbrCurrencyApi.Models;

/// <summary>
/// Справочник валют
/// </summary>

[Table("currencies")]
public class Currency
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [MaxLength(20)]
    [Column("cbr_id")]
    public string CbrId { get; set; } = string.Empty;

    [Required]
    [MaxLength(3)]
    [Column("num_code")]
    public string NumCode { get; set; } = string.Empty;

    [Required]
    [MaxLength(3)]
    [Column("char_code")]
    public string CharCode { get; set; } = string.Empty;

    [Column("nominal")]
    public int Nominal { get; set; }

    [Required]
    [MaxLength(200)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    public virtual ICollection<ExchangeRate> ExchangeRates { get; set; } = new List<ExchangeRate>();
}