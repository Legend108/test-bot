const data = require("../../data");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "start",
  cooldown: 10000,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const startStatus = client.db.get(`started-${message.author.id}`);
    if (startStatus) return;
    const teamName = args.join(" ");
    if (!teamName) return message.reply("Please provide your team name");
    if (!startStatus) {
      const firstMessage = await message.reply(
        "Sure, Saving Changes, please wait!"
      );
      client.db.set(`team-${message.author.id}`, data);
      client.db.set(`teamName-${message.author.id}`, teamName);
      setTimeout(() => {
        firstMessage.edit(
          "Saved Changes! Start off your journey by playing your first match!"
        );
        client.db.set(`started-${message.author.id}`, true);
      }, 5000);
    }
  },
};
