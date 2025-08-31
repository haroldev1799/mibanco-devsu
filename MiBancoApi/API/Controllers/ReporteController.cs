using MediatR;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ServicioMiBanco.Application.Queries.ReportQueries;
using ServiciosMiBanco.Infraestructure.CrossCutting.Services.PDF;
using ServiciosMiBanco.Infrastructure.CrossCutting.Utility.Extensions;
using System.Net;

namespace ServicioMiBanco.API.Controllers
{
    [Route("api/v1/[controller]")]
    public class ReporteController : Controller
    {
        private readonly IReportQueries _reportQueries;
        private readonly IMediator _mediator;
        private readonly IWebHostEnvironment _env;
        private readonly IPdfService _pdfService;
        public ReporteController(IReportQueries reportQueries, IMediator mediator, IWebHostEnvironment env, IPdfService pdfService)
        {
            _reportQueries = reportQueries ?? throw new ArgumentException(nameof(reportQueries));
            _mediator = mediator ?? throw new ArgumentException(nameof(mediator));
            _env = env;
            _pdfService = pdfService;
        }
        [HttpGet]
        [Route("GetAll")]
        [ProducesResponseType(typeof(ReportViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetAll(long clientId)
        {
            var result = await _reportQueries.GetAll(clientId);
            return Ok(result);
        }
        [HttpPost("GenerarReporte")]
        [Produces("application/pdf")]
        [ProducesResponseType(typeof(FileContentResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GenerarReporte(long clientId)
        {
            var path = Path.Combine(_env.ContentRootPath, "Templates", "Report", "report.html");
            var template = System.IO.File.ReadAllText(path);
            var result = await _reportQueries.GetAll(clientId);

            var html = TemplateExtensions.generateReport(template, JsonConvert.SerializeObject(result));
            var pdfBytes = _pdfService.FromHtml(html);

            return File(pdfBytes, "application/pdf", "reporte.pdf");
        }
    }
}
