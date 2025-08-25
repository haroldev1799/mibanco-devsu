using MediatR;
using Microsoft.AspNetCore.Mvc;
using ServicioMiBanco.Application.Commands.ClientCommand;
using ServicioMiBanco.Application.Queries.ClientQueries;
using System.Net;

namespace ServicioMiBanco.API.Controllers
{
    [Route("api/v1/[controller]")]
    public class ClientController : Controller
    {
        private readonly IClientQueries _clientQueries;
        private readonly IMediator _mediator;
        public ClientController(IClientQueries clientQueries, IMediator mediator)
        {
            _clientQueries = clientQueries ?? throw new ArgumentException(nameof(clientQueries));
            _mediator = mediator ?? throw new ArgumentException(nameof(mediator));
        }

        [HttpGet]
        [Route("GetAll")]
        [ProducesResponseType(typeof(ClientViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetAll()
        {
            var result = await _clientQueries.GetAll();
            return Ok(result);
        }

        [HttpGet]
        [Route("GetById")]
        [ProducesResponseType(typeof(ClientViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetById(long id)
        {
            var result = await _clientQueries.GetById(id);
            return Ok(result);
        }

        [HttpPost]
        [Route("Create")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateClientCommand command)
        {
            var commandResult = await _mediator.Send(command);
            return Ok(commandResult);
        }

        [HttpPut]
        [Route("Update")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Update([FromBody] UpdateClientCommand command)
        {
            var commandResult = await _mediator.Send(command);
            return Ok(commandResult);
        }

        [HttpDelete]
        [Route("Delete")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Delete([FromBody] DeleteClientCommand command)
        {
            var commandResult = await _mediator.Send(command);
            return Ok(commandResult);
        }
    }
}
