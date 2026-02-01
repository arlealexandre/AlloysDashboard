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
            entity.OwnsOne(a => a.Properties, p =>
            {
                p.Property(x => x.ProductType);
                p.Property(x => x.ProductShape);
                p.Property(x => x.ProductThickness);
                p.Property(x => x.AgingStep1Temp);
                p.Property(x => x.AgingStep1Time);
                p.Property(x => x.CastingTechnology);
                p.Property(x => x.HomoStep1Temp);
                p.Property(x => x.HomoStep1Time);
                p.Property(x => x.HotProcessStep1TIn);
                p.Property(x => x.LDirectionTys);
            });
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