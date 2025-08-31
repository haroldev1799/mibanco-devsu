using iText.Html2pdf;

namespace ServiciosMiBanco.Infraestructure.CrossCutting.Services.PDF
{
    public class PdfServices : IPdfService
    {
        public byte[] FromHtml(string html)
        {
            if (string.IsNullOrWhiteSpace(html))
                throw new ArgumentException("El HTML no puede estar vacío");

            using var ms = new MemoryStream();
            var props = new ConverterProperties();
            HtmlConverter.ConvertToPdf(html, ms, props);
            return ms.ToArray();
        }
    }
}