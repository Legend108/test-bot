const data = require("../../data");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "reset",
  cooldown: 10000,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const startStatus = client.db.get(`started-${message.author.id}`);
    if (startStatus) {
      const msg = await message.reply("Deleting account...");

      client.db.delete(`team-${message.author.id}`);
      client.db.delete(`teamName-${message.author.id}`);
      const userLineup = client.db.delete(`team-${message.author.id}`);
      const teamName = client.db.delete(`teamName-${message.author.id}`);
      const userBalance = client.db.delete(`bal-${message.author.id}`);
      const cards = client.db.delete(`cards-${message.author.id}`);
      const matchesPlayed = client.db.delete(`matches-${message.author.id}`);
      const setMatch = client.db.delete(`lastMatch-${message.author.id}`);
      let curPoints = client.db.delete(`seasonPoints-${message.author.id}`);
      const lg = client.db.delete(`lastgame-${message.author.id}`);
      const loss = client.db.delete(`loss-${message.author.id}`);
      const draws = client.db.delete(`draws-${message.author.id}`);
      const wins = client.db.delete(`wins-${message.author.id}`);

      setTimeout(() => {
        msg.edit("Saving Changes");
      }, 2000);
      setTimeout(() => {
        msg.edit("Succesfully removed all data. Relogin to continue!");
        client.db.delete(`started-${message.author.id}`);
      }, 3000);
    } else {
      return;
    }
  },
};
