using System.Net;
using System.Text.Json;
using ServiciosMiBanco.Infraestructure.CrossCutting.Utility.Functions;

public class ResponseMiddleware
{
    private readonly RequestDelegate _next;

    public ResponseMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var originalBodyStream = context.Response.Body;

        using var memoryStream = new MemoryStream();
        context.Response.Body = memoryStream;

        try
        {
            await _next(context);

            // leer lo que escribió el controller
            memoryStream.Position = 0;
            var responseBody = await new StreamReader(memoryStream).ReadToEndAsync();

            object? data = null;
            if (!string.IsNullOrWhiteSpace(responseBody))
            {
                try
                {
                    data = JsonSerializer.Deserialize<object>(responseBody);
                }
                catch
                {
                    data = responseBody;
                }
            }

            if (context.Response.StatusCode == (int)HttpStatusCode.NoContent)
            {
                context.Response.Body = originalBodyStream; // restauramos
                return; // no escribimos nada porque 204 no lo permite
            }

            // 👇 aseguramos que siempre haya algo
            if (data == null)
                data = new { };

            var apiResponse = new ApiResponse<object>(
                context.Response.StatusCode,
                context.Response.StatusCode == (int)HttpStatusCode.OK ? "OK" : "Error",
                data
            );

            context.Response.ContentType = "application/json";
            context.Response.Body = originalBodyStream; // restauramos
            var json = JsonSerializer.Serialize(apiResponse);
            await context.Response.WriteAsync(json);
        }
        catch (Exception ex)
        {
            context.Response.Body = originalBodyStream;
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";

            var errorResponse = new ApiResponse<string>(
                context.Response.StatusCode,
                "Ocurrió un error interno",
                ex.Message
            );

            var json = JsonSerializer.Serialize(errorResponse);
            await context.Response.WriteAsync(json);
        }
    }
}
