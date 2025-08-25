using Autofac;
using ServicioMiBanco.Application.Queries.AccountQueries;
using ServicioMiBanco.Application.Queries.ClientQueries;
using ServicioMiBanco.Application.Queries.MovementQueries;

namespace ServiciosMiBanco.Infraestructure.CrossCutting.IoC.AutofacModules
{
    public class QueriesModule : Module
    {
        public string _queriesConnectionString { get; }
        public QueriesModule(string queriesConnectionString)
        {
            _queriesConnectionString = queriesConnectionString;
        }
        protected override void Load(ContainerBuilder builder)
        {
            #region Account

            builder.Register(c => new AccountQueries(_queriesConnectionString))
                  .As<IAccountQueries>()
                  .InstancePerLifetimeScope();
            #endregion
            #region Client

            builder.Register(c => new ClientQueries(_queriesConnectionString))
                  .As<IClientQueries>()
                  .InstancePerLifetimeScope();
            #endregion
            #region Movement

            builder.Register(c => new MovementQueries(_queriesConnectionString))
                  .As<IMovementQueries>()
                  .InstancePerLifetimeScope();
            #endregion
        }
    }
}
