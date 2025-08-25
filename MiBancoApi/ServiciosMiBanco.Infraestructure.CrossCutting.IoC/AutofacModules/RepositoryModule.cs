using Autofac;
using ServicioMiBanco.Domain.AggregatesModel.AccountAggregate;
using ServicioMiBanco.Domain.AggregatesModel.ClientAggregate;
using ServicioMiBanco.Domain.AggregatesModel.MovementAggregate;
using ServicioMiBanco.Domain.AggregatesModel.PersonAggregate;
using ServiciosMiBanco.Infrastructure.Persistence.Repositories;

namespace ServiciosMiBanco.Infraestructure.CrossCutting.IoC.AutofacModules
{
    public class RepositoryModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            #region Account

            builder.RegisterType<AccountRepository>()
               .As<IAccountRepository>()
               .InstancePerLifetimeScope();
            #endregion

            #region Client

            builder.RegisterType<ClientRepository>()
               .As<IClientRepository>()
               .InstancePerLifetimeScope();
            #endregion

            #region Movement

            builder.RegisterType<MovementRepository>()
               .As<IMovementRepository>()
               .InstancePerLifetimeScope();
            #endregion

            #region Person

            builder.RegisterType<PersonRepository>()
               .As<IPersonRepository>()
               .InstancePerLifetimeScope();
            #endregion

        }
    }
}
