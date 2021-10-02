const client = require("../index");
const db = require("quick.db");
const players = require("../players");

client.on("ready", () => {
  setInterval(() => {
    let player1 = players[Math.floor(Math.random() * players.length)];
    let player2 = players[Math.floor(Math.random() * players.length)];
    let player3 = players[Math.floor(Math.random() * players.length)];
    if (player1 == player2) {
      player2 = players[Math.floor(Math.random() * players.length)];
    } else if (player2 == player3) {
      player3 = players[Math.floor(Math.random() * players.length)];
    } else if (player3 == player1) {
      player1 = players[Math.floor(Math.random() * players.length)];
    }

    const arr = [player1, player2, player3];

    // console.log(arr);

    client.db.set("shop", arr);
  }, 100 * 60 * 10);

  console.log(typeof client.db.get("shop"));

  console.log(`${client.user.tag} is now online!`);
});
