using Autofac;
using MediatR;
using ServicioMiBanco.Application.Commands.AccountCommand;
using ServicioMiBanco.Application.Commands.ClientCommand;
using ServicioMiBanco.Application.Commands.MovementCommand;
using System.Reflection;

namespace ServiciosMiBanco.Infraestructure.CrossCutting.IoC.AutofacModules
{
    public class CommandsModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            #region Account

            builder.RegisterAssemblyTypes(typeof(CreateAccountCommand).GetTypeInfo().Assembly)
             .AsClosedTypesOf(typeof(IRequestHandler<,>));

            builder.RegisterAssemblyTypes(typeof(UpdateAccountCommand).GetTypeInfo().Assembly)
             .AsClosedTypesOf(typeof(IRequestHandler<,>));

            builder.RegisterAssemblyTypes(typeof(DeleteAccountCommand).GetTypeInfo().Assembly)
             .AsClosedTypesOf(typeof(IRequestHandler<,>));

            #endregion

            #region Client

            builder.RegisterAssemblyTypes(typeof(CreateClientCommand).GetTypeInfo().Assembly)
             .AsClosedTypesOf(typeof(IRequestHandler<,>));

            builder.RegisterAssemblyTypes(typeof(UpdateClientCommand).GetTypeInfo().Assembly)
             .AsClosedTypesOf(typeof(IRequestHandler<,>));

            builder.RegisterAssemblyTypes(typeof(DeleteClientCommand).GetTypeInfo().Assembly)
             .AsClosedTypesOf(typeof(IRequestHandler<,>));

            #endregion

            #region Movement

            builder.RegisterAssemblyTypes(typeof(CreateMovementCommand).GetTypeInfo().Assembly)
             .AsClosedTypesOf(typeof(IRequestHandler<,>));

            builder.RegisterAssemblyTypes(typeof(UpdateMovementCommand).GetTypeInfo().Assembly)
             .AsClosedTypesOf(typeof(IRequestHandler<,>));

            builder.RegisterAssemblyTypes(typeof(DeleteMovementCommand).GetTypeInfo().Assembly)
             .AsClosedTypesOf(typeof(IRequestHandler<,>));

            #endregion
        }
    }
}
