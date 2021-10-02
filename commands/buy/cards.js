// const data = require("../../players"); 
const { MessageEmbed } = require('discord.js');
const nm = require('number-formatter');

module.exports = {
    name : 'cards',
    cooldown: 4000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
		const cards = client.db.get(`cards-${message.author.id}`);
		if(!cards) return message.reply("You do not have any cards!");

		message.channel.send(new MessageEmbed()
		.setTitle("Your Special Cards")
		.addFields(
			cards.map(c => {
				return {
					name: c.name,
					value: `Rating: ${c.rating}\nAge: ${c.age}\nPosition: ${c.pos}`,
					inline: true,
				}
			})
		))
    }
}
