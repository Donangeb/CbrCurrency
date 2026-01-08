using CbrCurrencyApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CbrCurrencyApi.Data;
public class AppDbContext : DbContext
{
    public DbSet<Currency> Currencies { get; set; }
    public DbSet<ExchangeRate> ExchangeRates { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) 
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Уникальный индекс на CbrId
        modelBuilder.Entity<Currency>()
            .HasIndex(c => c.CbrId)
            .IsUnique();

        // Уникальный индекс на CharCode для быстрого поиска
        modelBuilder.Entity<Currency>()
            .HasIndex(c => c.CharCode);

        // Составной индекс (дата + валюта)
        modelBuilder.Entity<ExchangeRate>()
            .HasIndex(er => new { er.Date, er.CurrencyId })
            .IsUnique();

        // Индекс для быстрого поиска по дате
        modelBuilder.Entity<ExchangeRate>()
            .HasIndex(er => er.Date);

        // Каскадное удаление
        modelBuilder.Entity<ExchangeRate>()
            .HasOne(er => er.Currency)
            .WithMany(c => c.ExchangeRates)
            .HasForeignKey(er => er.CurrencyId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}