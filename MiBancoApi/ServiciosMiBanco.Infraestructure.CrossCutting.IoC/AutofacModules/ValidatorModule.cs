using Autofac;
using FluentValidation;
using ServicioMiBanco.Application.Commands.AccountCommand;
using ServicioMiBanco.Application.Validations.AccountValidation;

namespace ServiciosMiBanco.Infraestructure.CrossCutting.IoC.AutofacModules
{
    public class ValidatorModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            #region ACCOUNT

            builder.RegisterAssemblyTypes(typeof(CreateAccountValidator).Assembly)
               .Where(t => t.IsClosedTypeOf(typeof(IValidator<>)))
               .AsImplementedInterfaces()
               .InstancePerLifetimeScope();
            #endregion
        }
    }
}
