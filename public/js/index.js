const roomID = document.getElementById("room");
const generateID = document.getElementById("generate-id");

generateID.addEventListener("click", () => {
  roomID.value = makeID(7);
});

function makeID(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
