using iText.Html2pdf;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout;

namespace ServiciosMiBanco.Infraestructure.CrossCutting.Services.PDF
{
    public class PdfServices : IPdfService
    {
        public byte[] FromHtml(string html)
        {
            if (string.IsNullOrWhiteSpace(html))
                throw new ArgumentException("El HTML no puede estar vacío");

            using var ms = new MemoryStream();

            var writer = new PdfWriter(ms);
            var pdf = new PdfDocument(writer);

            // 👇 Definimos hoja A4 horizontal
            pdf.SetDefaultPageSize(PageSize.A4.Rotate());

            var props = new ConverterProperties();

            // 👇 Generamos el documento a partir del HTML
            var document = HtmlConverter.ConvertToDocument(html, pdf, props);

            // 👇 Quitamos TODOS los márgenes
            document.SetMargins(0, 0, 0, 0);

            document.Close();
            return ms.ToArray();
        }
    }
}