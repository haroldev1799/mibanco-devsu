using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using ServicioMiBanco.API.Infrastructure.Filters;
using ServiciosMiBanco.Infraestructure.CrossCutting.IoC.AutofacModules;
using ServiciosMiBanco.Infrastructure.Persistence;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(options =>
{
    options.Filters.Add<HttpGlobalExceptionFilter>();
});


builder.Services.AddDbContext<ServiciosMiBancoContext>(options =>
    options.UseSqlServer(builder.Configuration["SFTConnectionString"], sqlOptions =>
{
    sqlOptions.MigrationsAssembly(typeof(Program).Assembly.FullName);
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
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
});

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
builder.Host.ConfigureContainer<ContainerBuilder>(container =>
{
    //container.RegisterModule(new MediatorModule());
    container.RegisterModule(new CommandsModule());
    container.RegisterModule(new ServicesModule());
    container.RegisterModule(new ValidatorModule());
    container.RegisterModule(new QueriesModule(builder.Configuration["SFTConnectionString"]));
    container.RegisterModule(new RepositoryModule());
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ResponseMiddleware>();

app.MapControllers();
app.Run();
