using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ServicioMiBanco.Domain.Core.Exceptions;
using ServiciosMiBanco.Infraestructure.CrossCutting.Utility.Constants;
using System.Net;

namespace ServicioMiBanco.API.Infrastructure.Filters
{
    public class HttpGlobalExceptionFilter : IExceptionFilter
    {
        private readonly IWebHostEnvironment env;
        private readonly ILogger<HttpGlobalExceptionFilter> logger;

        public HttpGlobalExceptionFilter(IWebHostEnvironment env, ILogger<HttpGlobalExceptionFilter> logger)
        {
            this.env = env;
            this.logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            logger.LogError(new EventId(context.Exception.HResult),
                context.Exception,
                context.Exception.Message);

            if (context.Exception.GetType() == typeof(ServicioMiBancoDomainException))
            {
                JsonErrorResponse json;
                var innerException = context.Exception.InnerException;

                if (innerException == null)
                {
                    json = new JsonErrorResponse
                    {
                        Messages = new string[] { context.Exception.Message },
                        MessageType = NotificationMessageType.BUSINESSLOGIC
                    };
                }
                else
                {
                    var errors = ((FluentValidation.ValidationException)innerException)
                                    .Errors.Select(x => x.ErrorMessage)
                                    .ToArray();

                    json = new JsonErrorResponse
                    {
                        Messages = errors,
                        MessageType = NotificationMessageType.FORMFIELDS
                    };
                }

                context.Result = new BadRequestObjectResult(json);
                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            }
            else
            {
                var json = new JsonErrorResponse
                {
                    Messages = new[] { "Ocurrió un error interno, intente nuevamente por favor." },
                    MessageType = NotificationMessageType.INTERNALERROR,
                    DeveloperMessage = context.Exception
                };

                context.Result = new InternalServerErrorObjectResult(json);
                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            }

            context.ExceptionHandled = true;
        }

        private class JsonErrorResponse
        {
            public string[] Messages { get; set; }
            public string MessageType { get; set; }
            public object DeveloperMessage { get; set; }
        }
    }

    public class InternalServerErrorObjectResult : ObjectResult
    {
        public InternalServerErrorObjectResult(object error)
            : base(error)
        {
            StatusCode = StatusCodes.Status500InternalServerError;
        }
    }
}
