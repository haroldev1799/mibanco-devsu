using Newtonsoft.Json;
using ServiciosMiBanco.Infraestructure.CrossCutting.Utility.Model;
using System.Text;

namespace ServiciosMiBanco.Infrastructure.CrossCutting.Utility.Extensions
{
    public static class TemplateExtensions
    {
        public static string generateReport(this string template, string model)
        {
            var table = JsonConvert.DeserializeObject<IEnumerable<Report>>(model);

            var rows = new StringBuilder();

            foreach (var item in table)
            {
                rows.AppendLine($@"
                <tr>
                    <td>{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.transaction_type}</td>
                    <td>{item.amount}</td>
                    <td>{item.balance}</td>
                    <td>{item.account}</td>
                    <td>{item.client}</td>
                </tr>");
            }

            // Reemplaza el marcador en el HTML
            template = template.Replace("{{TableRows}}", rows.ToString());

            return template;
        }
    }
}