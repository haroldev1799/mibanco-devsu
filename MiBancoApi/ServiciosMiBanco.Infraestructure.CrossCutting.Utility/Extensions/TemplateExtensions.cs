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
                    <td style='padding: 20px; text-align: center; padding: 12px 16px; font-weight: 600; font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;'>
                        {item.client}</td>
                    <td style='padding: 20px; text-align: center; padding: 12px 16px; font-weight: 600; font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;'>
                        {item.account}</td>
                    <td style='padding: 20px; text-align: center; padding: 12px 16px; font-weight: 600; font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;'>
                        {item.daily_limit_amount}</td>
                    <td style='padding: 20px; text-align: center; padding: 12px 16px; font-weight: 600; font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;'>
                        {item.initial_balance}</td>
                    <td style='padding: 20px; text-align: center; padding: 12px 16px; font-weight: 600; font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;'>
                        {item.current_balance}</td>
                    <td style='padding: 20px; text-align: center; padding: 12px 16px; font-weight: 600; font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;'>
                        {item.transaction_type}</td>
                    <td style='padding: 20px; text-align: center; padding: 12px 16px; font-weight: 600; font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;'>
                        {item.balance}</td>
                    <td style='padding: 20px; text-align: center; padding: 12px 16px; font-weight: 600; font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;'>
                        {item.amount}</td>
                    <td style='padding: 20px; text-align: center; padding: 12px 16px; font-weight: 600; font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;'>
                        {item.date}</td>
                </tr>");
            }

            // Reemplaza el marcador en el HTML
            template = template.Replace("{{TableRows}}", rows.ToString());

            return template;
        }
    }
}