using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicioMiBanco.Domain.Core.Exceptions
{
    public class ServicioMiBancoDomainException : Exception
    {
        public ServicioMiBancoDomainException()
        { }

        public ServicioMiBancoDomainException(string message)
            : base(message)
        { }

        public ServicioMiBancoDomainException(string message, Exception innerException)
            : base(message, innerException)
        { }
    }
}
