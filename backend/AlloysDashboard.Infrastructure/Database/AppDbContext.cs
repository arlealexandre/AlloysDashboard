using AlloysDashboard.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AlloysDashboard.Infrastructure.Database;

public class AppDbContext : DbContext
{

    public DbSet<Alloy> Alloys { get; set; }
    public DbSet<Composition> Compositions { get; set; }
    public DbSet<ChemicalElement> ChemicalElements { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Alloy has name as primary key
        modelBuilder.Entity<Alloy>(entity =>
        {
            entity.HasKey(a => a.Name);
            entity.OwnsOne(a => a.Properties);
        });

        // Chemical Element has symbol as primary key
        modelBuilder.Entity<ChemicalElement>().HasKey(e => e.Symbol);

        // Composition has couple AlloyName and ChemicalElementSymbol as primary key
        modelBuilder.Entity<Composition>()
        .HasKey(c => new { c.AlloyName, c.ChemicalElementSymbol });
        
        // Relation Composition - Alloy
        modelBuilder.Entity<Composition>()
            .HasOne(c => c.Alloy)
            .WithMany(a => a.Compositions)
            .HasForeignKey(c => c.AlloyName);

        // Relation Composition - ChemicalElement
        modelBuilder.Entity<Composition>()
            .HasOne(c => c.ChemicalElement)
            .WithMany()
            .HasForeignKey(c => c.ChemicalElementSymbol);
    }
}