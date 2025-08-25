using MediatR;
using Microsoft.AspNetCore.Mvc;
using ServicioMiBanco.Application.Commands.AccountCommand;
using ServicioMiBanco.Application.Queries.AccountQueries;
using System.Net;

namespace ServicioMiBanco.API.Controllers
{
    [Route("api/v1/[controller]")]
    public class AccountController : Controller
    {
        private readonly IAccountQueries _accountQueries;
        private readonly IMediator _mediator;
        public AccountController(IAccountQueries accountQueries, IMediator mediator)
        {
            _accountQueries = accountQueries ?? throw new ArgumentException(nameof(accountQueries));
            _mediator = mediator ?? throw new ArgumentException(nameof(mediator));
        }

        [HttpGet]
        [Route("GetAll")]
        [ProducesResponseType(typeof(AccountViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetAll()
        {
            var result = await _accountQueries.GetAll();
            return Ok(result);
        }

        [HttpGet]
        [Route("GetById")]
        [ProducesResponseType(typeof(AccountViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetById(long id)
        {
            var result = await _accountQueries.GetById(id);
            return Ok(result);
        }

        [HttpPost]
        [Route("Create")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateAccountCommand command)
        {
            var commandResult = await _mediator.Send(command);
            return Ok(commandResult);
        }

        [HttpPut]
        [Route("Update")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Update([FromBody] UpdateAccountCommand command)
        {
            var commandResult = await _mediator.Send(command);
            return Ok(commandResult);
        }

        [HttpDelete]
        [Route("Delete")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Delete([FromBody] DeleteAccountCommand command)
        {
            var commandResult = await _mediator.Send(command);
            return Ok(commandResult);
        }
    }
}
