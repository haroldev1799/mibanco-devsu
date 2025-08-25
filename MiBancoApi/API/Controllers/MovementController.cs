using MediatR;
using Microsoft.AspNetCore.Mvc;
using ServicioMiBanco.Application.Commands.MovementCommand;
using ServicioMiBanco.Application.Queries.MovementQueries;
using System.Net;

namespace ServicioMiBanco.API.Controllers
{
    [Route("api/v1/[controller]")]
    public class MovementController : Controller
    {
        private readonly IMovementQueries _movementQueries;
        private readonly IMediator _mediator;
        public MovementController(IMovementQueries movementQueries, IMediator mediator)
        {
            _movementQueries = movementQueries ?? throw new ArgumentException(nameof(movementQueries));
            _mediator = mediator ?? throw new ArgumentException(nameof(mediator));
        }

        [HttpGet]
        [Route("GetAll")]
        [ProducesResponseType(typeof(MovementViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetAll()
        {
            var result = await _movementQueries.GetAll();
            return Ok(result);
        }

        [HttpGet]
        [Route("GetById")]
        [ProducesResponseType(typeof(MovementViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetById(long id)
        {
            var result = await _movementQueries.GetById(id);
            return Ok(result);
        }

        [HttpPost]
        [Route("Create")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateMovementCommand command)
        {
            var commandResult = await _mediator.Send(command);
            return Ok(commandResult);
        }

        [HttpPut]
        [Route("Update")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Update([FromBody] UpdateMovementCommand command)
        {
            var commandResult = await _mediator.Send(command);
            return Ok(commandResult);
        }

        [HttpDelete]
        [Route("Delete")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Delete([FromBody] DeleteMovementCommand command)
        {
            var commandResult = await _mediator.Send(command);
            return Ok(commandResult);
        }
    }
}
