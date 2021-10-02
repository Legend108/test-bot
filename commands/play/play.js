const data = require("../../data");
const teams = require("../../teams");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "play-match",
  cooldown: 10000,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    let teamAgainst = teams[Math.floor(Math.random() * teams.length)];
    client.db.set(`isplaying-${message.author.id}`, true);
    client.db.set(`isplaying`, true);
    const userLineup = client.db.get(`team-${message.author.id}`);
    const teamName = client.db.get(`teamName-${message.author.id}`);
    const userBalance = client.db.get(`bal-${message.author.id}`);
    const matchesPlayed = client.db.get(`matches-${message.author.id}`);
    const setMatch = client.db.get(`lastMatch-${message.author.id}`);
    let curPoints = client.db.get(`seasonPoints-${message.author.id}`);

    if (teamAgainst.name == setMatch)
      teamAgainst = teams[Math.floor(Math.random() * teams.length)];

    client.db.set(`lastMatch-${message.author.id}`, teamAgainst.name);

    let team1Score;
    let team2Score;

    if (teamAgainst.rating > 90) {
      team1Score = Math.floor(Math.random() * 3);
      team2Score = Math.floor(Math.random() * 4);
    } else if (teamAgainst.rating > 80) {
      team1Score = Math.floor(Math.random() * 2);
      team2Score = Math.floor(Math.random() * 3);
    } else if (teamAgainst.rating > 70) {
      team1Score = Math.floor(Math.random() * 4);
      team2Score = Math.floor(Math.random() * 3);
    } else if (teamAgainst.rating > 60) {
      team1Score = Math.floor(Math.random() * 5);
      team2Score = Math.floor(Math.random() * 4);
    }

    if (!curPoints) curPoints = 0;

    console.log(teamAgainst.name);

    const firstMsg = await message.channel.send(
      new MessageEmbed()
        .setTitle(`Matchday`)
        .setDescription(`${teamName} vs ${teamAgainst.name}`)
    );

    setTimeout(() => {
      firstMsg.edit("Playing Match...");
    }, 6000);

    setTimeout(() => {
      if (team1Score > team2Score) {
        client.db.add(`seasonPoints-${message.author.id}`, 3);
        firstMsg.edit(
          `${teamName} ${team1Score} - ${team2Score} ${teamAgainst.name}`
        );
        client.db.set(
          `lastgame-${message.author.id}`,
          `${teamName} ${team1Score} - ${team2Score} ${teamAgainst.name}`
        );
        client.db.add(`bal-${message.author.id}`, 350000);
        client.db.add(`wins-${message.author.id}`, 1);
      } else if (team1Score < team2Score) {
        firstMsg.edit(
          `${teamName} ${team1Score} - ${team2Score} ${teamAgainst.name}`
        );
        client.db.add(`loss-${message.author.id}`, 1);
        client.db.set(
          `lastgame-${message.author.id}`,
          `${teamName} ${team1Score} - ${team2Score} ${teamAgainst.name}`
        );
      } else if (team1Score == team2Score) {
        client.db.add(`seasonPoints-${message.author.id}`, 1);
        firstMsg.edit(
          `${teamName} ${team1Score} - ${team2Score} ${teamAgainst.name}`
        );
        client.db.add(`bal-${message.author.id}`, 100000);
        client.db.add(`draws-${message.author.id}`, 1);
        client.db.set(
          `lastgame-${message.author.id}`,
          `${teamName} ${team1Score} - ${team2Score} ${teamAgainst.name}`
        );
      }
      client.db.delete(`isplaying-${message.author.id}`);
      client.db.delete(`isplaying`);
      client.db.add(`matches-${message.author.id}`, 1);
    }, 16000);
  },
};
