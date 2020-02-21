import "./css/main.css";
import * as signalR from "@microsoft/signalr";

const divMessages = document.querySelector("#divMessages");
const tbMessage = document.querySelector("#tbMessage");
const btnSend = document.querySelector("#btnSend");
const btnConnect = document.getElementById("btnConnect");
const inputUsername = document.getElementById("inputUsername");

const hubUrl = "/hubs/chat";
let connection;
let username;

class Index {
    constructor() {
        console.log("created index");
        btnConnect.addEventListener("click", () => this.init());
        inputUsername.value = "atle";
    }

    async init() {
        username = inputUsername.value;
        if (!username) {
            this.appendMsg("SPECIFY USERNAME");
            return;
        }
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        
        await connection.start().catch(e => {
            console.error(e.toString());
        });
        console.log("started");
        btnConnect.setAttribute("disabled", "disabled");

        connection.on("receiveMessage", (u, m) => this.onMessage(u, m));
        connection.on("sendMessage", () => this.onSend());

        tbMessage.value = "hallo";
        tbMessage.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                this.send();
            }
        });
        btnSend.removeAttribute("disabled");
        btnSend.addEventListener("click", () => this.send());
    }
    onMessage(user, msg) {
        const m = `<span class="message-author">${user}</span><span>${msg}</span>`
        this.appendMsg(m);
    }
    appendMsg(msg) {
        let m = document.createElement("div");
        m.innerHTML = msg;
        divMessages.appendChild(m);
        divMessages.scrollTop = divMessages.scrollHeight;
    }
    onSend(data) {
        console.log(data);
    }
    async send() {
        const msg = {user: username, message: tbMessage.value};
        await connection.invoke("SendMessage", msg).catch(function (err) {
            return console.error(err.toString());
        });
        // await connection.send("SendMessage", msg).catch(function (err) {
        //     return console.error(err.toString());
        // });
        console.log("sent");
    }
}

export default new Index();