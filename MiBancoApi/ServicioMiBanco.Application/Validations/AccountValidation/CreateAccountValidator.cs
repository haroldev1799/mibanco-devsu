using FluentValidation;
using ServicioMiBanco.Application.Commands.AccountCommand;
using ServiciosMiBanco.Infraestructure.CrossCutting.Utility.Validations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicioMiBanco.Application.Validations.AccountValidation
{
    public class CreateAccountValidator : AbstractValidator<CreateAccountCommand>
    {
        public CreateAccountValidator()
        {
            RuleFor(command => command.account_number)
                .GreaterThan(0).WithMessage("El número de cuenta debe ser mayor a 0");
            RuleFor(command => command.account_number.ToString())
                .NotNull().NotEmpty().WithMessage(AccountValidatorMessages.ACCOUNT_NUMBER)
                .Length(10).WithMessage("El número de cuenta debe tener exactamente 10 dígitos")
                .Matches(@"^\d+$").WithMessage("El número de cuenta solo debe contener números");
            RuleFor(command => command.type).NotNull().NotEmpty().WithMessage(AccountValidatorMessages.TYPE);
            RuleFor(command => command.initial_balance).NotNull().NotEmpty().WithMessage(AccountValidatorMessages.INITIAL_BALANCE);
            RuleFor(command => command.daily_limit_amount).NotNull().NotEmpty().WithMessage(AccountValidatorMessages.DAILY_LIMIT_AMOUNT);
            RuleFor(command => command.status).NotNull().NotEmpty().WithMessage(AccountValidatorMessages.STATUS);
            RuleFor(command => command.client_id).NotNull().NotEmpty().WithMessage(AccountValidatorMessages.CLIENT_ID);
        }
    }
}
