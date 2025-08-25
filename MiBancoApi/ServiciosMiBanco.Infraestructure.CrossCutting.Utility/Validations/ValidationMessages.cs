

namespace ServiciosMiBanco.Infraestructure.CrossCutting.Utility.Validations
{
    public class AccountValidatorMessages
    {
        public const string ACCOUNT_NUMBER = "Debe llenarse el account_number";
        public const string TYPE = "Debe llenarse el type";
        public const string INITIAL_BALANCE = "Debe llenarse el initial_balance";
        public const string CURRENT_BALANCE = "Debe llenarse el current_balance";
        public const string DAILY_LIMIT_AMOUNT = "Debe llenarse el daily_limit_amount";
        public const string STATUS = "Debe llenarse el status";
        public const string CLIENT_ID = "Debe llenarse el client_id";

    }
    public class ClientValidatorMessages
    {
        public const string REPUESTO_NO_EXISTE = "El repuesto no existe.";
 
    }
    public class MovementValidatorMessages
    {
        public const string REPUESTO_NO_EXISTE = "El repuesto no existe.";
    }
    public class PersonValidatorMessages
    {
        public const string REPUESTO_NO_EXISTE = "El repuesto no existe.";
    }

}
