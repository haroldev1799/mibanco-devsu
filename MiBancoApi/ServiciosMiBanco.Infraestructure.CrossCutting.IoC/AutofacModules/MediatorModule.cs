using Autofac;
using MediatR;
using MediatR.NotificationPublishers;
using ServicioMiBanco.Application.Behaviors;
using System.Reflection;

namespace ServiciosMiBanco.Infraestructure.CrossCutting.IoC.AutofacModules
{
    public class MediatorModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // MediatR Core
            builder.RegisterAssemblyTypes(typeof(IMediator).GetTypeInfo().Assembly)
                   .AsImplementedInterfaces();

            // Registrar Handlers
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
                   .AsClosedTypesOf(typeof(IRequestHandler<,>))
                   .AsImplementedInterfaces();

            // Registrar Pipeline (Validaciones, etc.)
            builder.RegisterGeneric(typeof(ValidatorBehavior<,>))
                   .As(typeof(IPipelineBehavior<,>))
                   .InstancePerLifetimeScope();

            // Publisher para notificaciones
            builder.RegisterType<ForeachAwaitPublisher>()
                   .As<INotificationPublisher>()
                   .SingleInstance();
        }
    }
}
