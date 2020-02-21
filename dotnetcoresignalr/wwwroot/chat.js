class Chat {
    constructor(url) {
        this.connection = new signalR.HubConnectionBuilder()
        .withUrl(url)
        .build();

        this.connection.on("ReceiveMessage", this.onReceiveMsg);
        this.connection.start().catch(err => console.error(err.toString()));
        document.getElementById("sendButton").addEventListener("click", e => {
            this.sendMsg(e);
        });
    }

    onReceiveMsg(user, msg) {
        let msgClean = msg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        let encodedMsg = user + " says " + msgClean;
        let li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById("messagesList").appendChild(li);
    }

    sendMsg(event) {
        let user = document.getElementById("userInput").value;
        let message = document.getElementById("messageInput").value;
        this.connection.invoke("SendMessage", user, message).catch(err => console.error(err.toString()));
        event.preventDefault();
    }
}
export default Chat;






