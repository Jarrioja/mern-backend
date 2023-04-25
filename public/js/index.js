let user;
let chatBox = document.getElementById("chatBox");
Swal.fire({
  title: "Login",
  input: "text",
  text: "Nombre",
  inputValidator: (value) => {
    return !value && "!!Coloca el usuario";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});

chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    console.log(chatBox.value);
    socket.emit("message", { user: user, message: chatBox.value });
    chatBox.value = "";
  }
});

socket.on("messageLogs", (data) => {
  console.log("🚀 ~ file: index.js:24 ~ socket.on ~ data:", data);
  let log = document.getElementById("messageLogs");
  let messages = "";
  data.forEach((message) => {
    messages = messages + `${message.user} dice: ${message.message}</br>`;
  });
  log.innerHTML = messages;
});
