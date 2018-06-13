using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace dotnetcoresignalr.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public override Task OnConnectedAsync() {
            Clients.All.SendAsync("ReceiveMessage", "server", "hello");
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(System.Exception exception) {
            Console.WriteLine($"user got disconnected {exception.Message}");
            return base.OnDisconnectedAsync(exception);
        }
    }
}