const data = require("../../players");
const { MessageEmbed } = require("discord.js");
const numberFormatter = require("number-formatter");
module.exports = {
  name: "myteam",
  cooldown: 4000,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const userLineup = client.db.get(`team-${message.author.id}`);
    const teamName = client.db.get(`teamName-${message.author.id}`);
    const userBalance = client.db.get(`bal-${message.author.id}`);
    const matchesPlayed = client.db.get(`matches-${message.author.id}`);
    const setMatch = client.db.get(`lastMatch-${message.author.id}`);
    let curPoints = client.db.get(`seasonPoints-${message.author.id}`);
    const lg = client.db.get(`lastgame-${message.author.id}`);
    const loss = client.db.get(`loss-${message.author.id}`);
    const draws = client.db.get(`draws-${message.author.id}`);
    const wins = client.db.get(`wins-${message.author.id}`);

    message.channel.send(
      new MessageEmbed()
        .setTitle(`Your Team`)
        .addFields(
          { name: "Name", value: teamName },
          {
            name: "Balance",
            value: `$${numberFormatter("#,###.", userBalance || 0)}`,
          },
          { name: "Matches Played", value: matchesPlayed || 0 },
          { name: "Last Match", value: lg || "No Match" },
          { name: "Current Points", value: curPoints || 0 },
          { name: "Wins", value: wins || 0 },
          { name: "Losses", value: loss || 0 },
          { name: "Draws", value: draws || 0 }
        )
        .setColor("GREEN")
    );
  },
};
