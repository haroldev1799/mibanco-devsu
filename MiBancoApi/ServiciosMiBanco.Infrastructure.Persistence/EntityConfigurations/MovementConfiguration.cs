using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using ServicioMiBanco.Domain.AggregatesModel.MovementAggregate;

namespace ServiciosMiBanco.Infrastructure.Persistence.EntityConfigurations
{
    public class MovementConfiguration : IEntityTypeConfiguration<Movement>
    {
        public void Configure(EntityTypeBuilder<Movement> builder)
        {
            builder.ToTable("movement", ServiciosMiBancoContext.DEFAULT_SCHEMA);

            builder.HasKey(m => m.Id);

            builder.Property(m => m.date)
                   .IsRequired();

            builder.Property(m => m.transaction_type)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.Property(m => m.amount)
                   .HasColumnType("decimal(12,2)")
                   .IsRequired();

            builder.Property(m => m.balance)
                   .HasColumnType("decimal(12,2)")
                   .IsRequired();

            builder.HasOne(m => m.account)
                   .WithMany(c => c.Movements)
                   .HasForeignKey(m => m.account_id);
        }
    }
}
