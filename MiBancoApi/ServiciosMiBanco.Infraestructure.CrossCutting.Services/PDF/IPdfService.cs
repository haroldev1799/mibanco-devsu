

namespace ServiciosMiBanco.Infraestructure.CrossCutting.Services.PDF
{
    public interface IPdfService
    {
        byte[] FromHtml(string html);
    }
}
