using Microsoft.EntityFrameworkCore;
using MapApi.Data;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load("../.env");

var connectionString = Environment.GetEnvironmentVariable("CONNECTIONSTRINGS__DEFAULTCONNECTION");

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<MapContext>(opt =>
    opt.UseMySql(
        connectionString,
        new MySqlServerVersion(new Version(8, 0, 40))
    )
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUi(options =>
    {
        options.DocumentPath = "/openapi/v1.json";
    });
}

app.UseCors("AllowFrontend"); 
// app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.Urls.Add("http://localhost:5000");
app.Run();