using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using ServicioMiBanco.API.Infrastructure.Filters;
using ServiciosMiBanco.Infraestructure.CrossCutting.IoC.AutofacModules;
using ServiciosMiBanco.Infrastructure.Persistence;
using ServiciosMiBanco.Infraestructure.CrossCutting.Services.PDF;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(options =>
{
    options.Filters.Add<HttpGlobalExceptionFilter>();
});

builder.Services.AddDbContext<ServiciosMiBancoContext>(options =>
options.UseSqlServer(builder.Configuration["SFTConnectionString"], sqlOptions =>
{
    sqlOptions.MigrationsAssembly(typeof(ServiciosMiBancoContext).Assembly.FullName);
    sqlOptions.EnableRetryOnFailure(10, TimeSpan.FromSeconds(30), null);
}));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddCors();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.Authority = builder.Configuration["STS:URL_SERVER"];
    options.RequireHttpsMetadata = false;
    options.Audience = builder.Configuration["STS:API_SCOPE"];
});

// === Autofac DI modules ===
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
builder.Host.ConfigureContainer<ContainerBuilder>(container =>
{
    container.RegisterModule(new MediatorModule());
    container.RegisterModule(new CommandsModule());
    container.RegisterModule(new ServicesModule());
    container.RegisterModule(new ValidatorModule());
    container.RegisterModule(new QueriesModule(builder.Configuration["SFTConnectionString"]));
    container.RegisterModule(new RepositoryModule());
});

// registro de servicio PDF
builder.Services.AddScoped<IPdfService, PdfServices>();

builder.Services.AddSwaggerGen(c =>
{
    c.MapType<FileContentResult>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "binary"
    });
});

var app = builder.Build();

// === ⚡ Ejecutar migraciones automáticas al iniciar ===
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ServiciosMiBancoContext>();
    db.Database.Migrate(); // 👉 Crea BD y aplica migraciones en Docker
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "MiBanco API v1");
    c.RoutePrefix = "swagger"; // Swagger quedará en /swagger
});
//}

app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ResponseMiddleware>();

app.MapControllers();
app.Run();