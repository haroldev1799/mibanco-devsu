using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ServicioMiBanco.Domain.AggregatesModel.ClientAggregate;
using ServicioMiBanco.Domain.AggregatesModel.PersonAggregate;

namespace ServiciosMiBanco.Infrastructure.Persistence.EntityConfigurations
{
    public class PersonConfiguration : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.ToTable("person", ServiciosMiBancoContext.DEFAULT_SCHEMA);

            builder.HasKey(p => p.Id);

            builder.Property(p => p.name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(p => p.gender)
                   .HasMaxLength(20);

            builder.Property(p => p.age);

            builder.Property(p => p.identification)
                   .IsRequired()
                   .HasMaxLength(20);

            builder.Property(p => p.address)
                   .HasMaxLength(150);

            builder.Property(p => p.phone)
                   .HasMaxLength(20);

            builder.HasOne(p => p.Client)
                   .WithOne(c => c.Person)
                   .HasForeignKey<Client>(c => c.person_id);
        }
    }
}
