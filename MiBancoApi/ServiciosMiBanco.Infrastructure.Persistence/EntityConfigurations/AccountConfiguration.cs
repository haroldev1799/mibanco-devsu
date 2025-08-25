using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using ServicioMiBanco.Domain.AggregatesModel.AccountAggregate;


namespace ServiciosMiBanco.Infrastructure.Persistence.EntityConfigurations
{
    public class AccountConfiguration : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.ToTable("account", ServiciosMiBancoContext.DEFAULT_SCHEMA);

            builder.HasKey(c => c.Id);

            builder.Property(c => c.account_number)
               .IsRequired();

            builder.Property(c => c.type)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.Property(c => c.initial_balance)
                   .HasColumnType("decimal(12,2)");

            builder.Property(c => c.current_balance)
                   .HasColumnType("decimal(12,2)");
            
            builder.Property(c => c.daily_limit_amount)
                   .HasColumnType("decimal(12,2)");

            builder.Property(c => c.status)
                   .IsRequired();

            builder.HasOne(c => c.Client)
                   .WithMany(cl => cl.Accounts)
                   .HasForeignKey(c => c.client_id);

            builder.HasMany(c => c.Movements)
                   .WithOne(m => m.account)
                   .HasForeignKey(m => m.account_id);
        }
    }
}
