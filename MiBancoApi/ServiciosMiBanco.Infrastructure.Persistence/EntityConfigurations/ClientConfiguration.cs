using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using ServicioMiBanco.Domain.AggregatesModel.ClientAggregate;

namespace ServiciosMiBanco.Infrastructure.Persistence.EntityConfigurations
{
    public class ClientConfiguration : IEntityTypeConfiguration<Client>
    {
        public void Configure(EntityTypeBuilder<Client> builder)
        {
            builder.ToTable("client", ServiciosMiBancoContext.DEFAULT_SCHEMA);

            builder.HasKey(c => c.Id);

            builder.Property(c => c.password)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(c => c.status)
                   .IsRequired();

            // Relación con Persona ya definida en PersonaConfiguration
            builder.HasMany(c => c.Accounts)
                   .WithOne(cu => cu.Client)
                   .HasForeignKey(cu => cu.client_id);
        }
    }
}
