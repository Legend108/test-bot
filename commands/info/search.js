const data = require("../../players");
const { MessageEmbed } = require("discord.js");
const numberFormatter = require("number-formatter");
module.exports = {
  name: "search",
  cooldown: 4000,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const arr = [];
    ini = data.map((d) =>
      arr.push({
        name: d.name,
        rating: d.rating,
        age: d.age,
        position: d.position,
        price: d.price,
      })
    );

    const toFind = args.join(" ").toLowerCase();
    if (!toFind) return message.reply("Please provide a player name");

    arr.forEach((d) => {
      if (d.name.toLowerCase() == toFind) {
        message.reply(
          new MessageEmbed()
            .setTitle(d.name)
            .addField("Rating", String(d.rating))
            .addField("Age", String(d.age))
            .addField("Position", d.position)
            .addField("Price", `$${numberFormatter("#,###.", d.price || 0)}`)
        );
      } else {
        return;
      }
    });
  },
};
