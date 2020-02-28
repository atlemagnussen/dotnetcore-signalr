using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Test.webapi.Models;

namespace Test.webapi.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ILogger _logger;

        public ChatHub(ILogger<ChatHub> logger)
        {
            _logger = logger;
        }
        public async Task SendMessage(UserMessage msg)
        {
            _logger.LogDebug("DEBUG SendMessage called");
            await Clients.All.SendAsync("ReceiveMessage", msg.User, msg.Message);
        }

        public override async Task OnConnectedAsync()
        {
            _logger.LogInformation(Context.ConnectionId);
            await Clients.All.SendAsync("ReceiveMessage", "server", $"ConnectionId {Context.ConnectionId} connected!");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            _logger.LogInformation(Context.ConnectionId);
            await base.OnDisconnectedAsync(ex);
        }
    }
}