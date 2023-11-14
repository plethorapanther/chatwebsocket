// script.js
let socket = new WebSocket("ws://localhost:8080/ws");

document.forms.publish.onsubmit = function () {
  let outgoingMessage = this.message.value;
  let username = prompt("Enter your username:"); // Prompt the user for a username

  // Ensure the username is not empty
  if (username) {
    let data = {
      username: username,
      message: outgoingMessage,
    };

    socket.send(JSON.stringify(data));
  }

  return false;
};

socket.onmessage = function (event) {
  let data = JSON.parse(event.data);

  let messageElem = document.createElement('div');
  messageElem.textContent = data.message;
  document.getElementById('messages').prepend(messageElem);
};
