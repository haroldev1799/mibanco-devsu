using Autofac;
using MediatR;
using MediatR.NotificationPublishers;
using MediatR.Licensing;
using ServicioMiBanco.Application.Behaviors;
using System.Reflection;

namespace ServiciosMiBanco.Infraestructure.CrossCutting.IoC.AutofacModules
{
    public class MediatorModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // Publisher por defecto
            builder.RegisterType<ForeachAwaitPublisher>()
                   .As<INotificationPublisher>()
                   .SingleInstance();

            // Registrar núcleo de MediatR
            builder.RegisterAssemblyTypes(typeof(IMediator).GetTypeInfo().Assembly)
                   .AsImplementedInterfaces();

            // Pipeline behaviors
            builder.RegisterGeneric(typeof(ValidatorBehavior<,>))
                   .As(typeof(IPipelineBehavior<,>));
        }
    }
}
