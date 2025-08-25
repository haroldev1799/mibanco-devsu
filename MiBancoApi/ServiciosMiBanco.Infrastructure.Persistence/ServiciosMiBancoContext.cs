using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using ServicioMiBanco.Domain.AggregatesModel.AccountAggregate;
using ServicioMiBanco.Domain.AggregatesModel.ClientAggregate;
using ServicioMiBanco.Domain.AggregatesModel.MovementAggregate;
using ServicioMiBanco.Domain.AggregatesModel.PersonAggregate;
using ServicioMiBanco.Domain.Core.SeedWork;
using ServiciosMiBanco.Infrastructure.Persistence.EntityConfigurations;

namespace ServiciosMiBanco.Infrastructure.Persistence
{
    public class ServiciosMiBancoContext : DbContext, IUnitOfWork
    {
        public const string DEFAULT_SCHEMA = "dbo";
        #region Persona Aggregate
        public DbSet<Person> Person { get; set; }
        #endregion

        #region Cliente Aggregate
        public DbSet<Client> Client { get; set; }
        #endregion

        #region Cuenta Aggregate
        public DbSet<Account> Account { get; set; }
        #endregion

        #region Movimiento Aggregate
        public DbSet<Movement> Movement { get; set; }
        #endregion

        private readonly IMediator _mediator;

        // Constructor requerido por EF Core
        private ServiciosMiBancoContext(DbContextOptions<ServiciosMiBancoContext> options) : base(options) { }

        // Constructor con soporte a MediatR para Domain Events
        public ServiciosMiBancoContext(DbContextOptions<ServiciosMiBancoContext> options, IMediator mediator)
            : base(options)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Persona
            modelBuilder.ApplyConfiguration(new PersonConfiguration());
            #endregion

            #region Cliente
            modelBuilder.ApplyConfiguration(new ClientConfiguration());
            #endregion

            #region Cuenta
            modelBuilder.ApplyConfiguration(new AccountConfiguration());
            #endregion

            #region Movimiento
            modelBuilder.ApplyConfiguration(new MovementConfiguration());
            #endregion
        }

        public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default)
        {
            // Publica eventos de dominio antes de guardar (si los usas)
            if (_mediator != null)
                await _mediator.DispatchDomainEventsAsync(this);

            await base.SaveChangesAsync(cancellationToken);
            return true;
        }
    }

    public class ServiciosMiBancoDesignFactory : IDesignTimeDbContextFactory<ServiciosMiBancoContext>
    {
        public ServiciosMiBancoContext CreateDbContext(string[] args)
        {
            var basePath = Directory.GetCurrentDirectory();

            IConfigurationRoot configuration = new ConfigurationBuilder()
                .AddJsonFile(Path.Combine(basePath, "appsettings.json"), optional: false, reloadOnChange: true)
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<ServiciosMiBancoContext>()
                .UseSqlServer(configuration["SFTConnectionString"]);


            return new ServiciosMiBancoContext(optionsBuilder.Options, new NoMediator());
        }

        class NoMediator : IMediator
        {
            public Task<TResponse> Send<TResponse>(IRequest<TResponse> request, CancellationToken cancellationToken = default)
                => Task.FromResult<TResponse>(default!);

            public Task<object?> Send(object request, CancellationToken cancellationToken = default)
                => Task.FromResult<object?>(default);

            public Task Send<TRequest>(TRequest request, CancellationToken cancellationToken = default) where TRequest : IRequest
                => Task.CompletedTask;

            public Task Publish(object notification, CancellationToken cancellationToken = default)
                => Task.CompletedTask;

            public Task Publish<TNotification>(TNotification notification, CancellationToken cancellationToken = default) where TNotification : INotification
                => Task.CompletedTask;

            public IAsyncEnumerable<TResponse> CreateStream<TResponse>(IStreamRequest<TResponse> request, CancellationToken cancellationToken = default)
                => AsyncEnumerable.Empty<TResponse>();

            public IAsyncEnumerable<object?> CreateStream(object request, CancellationToken cancellationToken = default)
                => AsyncEnumerable.Empty<object?>();
        }
    }
}
