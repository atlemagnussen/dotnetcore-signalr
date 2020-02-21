import rest from './rest.js';
import Chat from './chat.js';
class Index {
    constructor() {
        this.chat = new Chat("/chatHub");
        this.setupRestBtn();
    }

    setupRestBtn() {
        let inputUrl = document.getElementById('apiurl');
        let btnRest = document.getElementById('btnRest');
        let taResult = document.getElementById('result');
        btnRest.addEventListener("click", () => {
            let url = inputUrl.value;
            rest.call("GET", url)
            .then(res => {
                taResult.innerHTML = JSON.stringify(res);
            });
        });
    }
}

export default new Index();