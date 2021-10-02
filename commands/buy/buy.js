// const data = require("../../players");
const { MessageEmbed } = require("discord.js");
const nm = require("number-formatter");

module.exports = {
  name: "buy",
  cooldown: 4000,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const curshop = client.db.get("shop");
    const balance = client.db.get(`bal-${message.author.id}`); // get the balance of the user
    const playerToBuy = args.join(" ");

    if (!playerToBuy) return message.reply("Please provide a player ID");

    const arr = [];

    curshop.map((m) => {
      arr.push({
        name: m.name,
        age: m.age,
        price: m.price,
        rating: m.rating,
        pos: m.position,
        id: m.id,
      });
    });

    const price = arr.find((m) => m.id == playerToBuy);
    console.log(price);
    if (!price)
      return message.reply("This player is not available in the market");
    if (arr.find((m) => m.id == playerToBuy)) {
      if (balance >= price.price) {
        let val = client.db.get(`cards-${message.author.id}`);
        if (val) val = val.find((c) => c.id == price.id);
        if (!val) val = null;
        if (val) {
          return message.reply("You already have this card!");
        } else if (val == null) {
          client.db.subtract(`bal-${message.author.id}`, price.price);
          message.reply(
            `You have succesfully bought ${price.name} for $${nm(
              "#,###.",
              price.price
            )}`
          );
          console.log("Bought");
          client.db.push(`cards-${message.author.id}`, price);
        }
      } else {
        message.reply(
          `Sorry, you do not have enough money to buy this player. You need $${nm(
            "#,###.",
            price.price - balance
          )} more!`
        );
        console.log("Insufficient money");
      }
    } else {
      message.reply("This player is currently not available in the shop");
      console.log("Not available");
    }
  },
};
