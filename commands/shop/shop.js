// const data = require("../../players");
const { MessageEmbed } = require("discord.js");
const nm = require("number-formatter");

module.exports = {
  name: "shop",
  cooldown: 4000,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const curShop = client.db.get("shop");

    const arr = [];

    curShop.map((m) => {
      arr.push({
        name: m.name,
        age: m.age,
        price: `$` + nm("#,###.", m.price || 0),
        rating: m.rating,
        pos: m.position,
        id: m.id,
      });
    });

    message.channel.send(
      new MessageEmbed()
        .setTitle("Player Shop\n\nUpdates every 10 minutes")
        .addFields(
          arr.map((m) => {
            return {
              name: m.name,
              value: `Age: ${m.age}\nRating: ${m.rating}\nPrice: ${m.price}\nPosition: ${m.pos}\nId: ${m.id} || Use this ID when buying this player ||`,
            };
          })
        )
        .setColor("#32f32f")
    );
  },
};
