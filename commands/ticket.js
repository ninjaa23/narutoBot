module.exports = {
    run : (message) => {
        message.reply("Cette commande est en maintenance désolée ninja..")
    },
    name : 'ticket'
}
/*
const config = require("../config.json"),
    fs = require('fs'),
    Discord = require('discord.js')

module.exports = {
    run : async(message, client) => {
        if(Object.values(client.db.tickets).some(ticket => ticket.author === message.author.id)) return message.channel.send("Tu as déjà un ticket d'ouvert hmall.")
        const channel = await message.guild.channels.create(`🎫 Ticket de ${message.author.username}`, {
            type : "text",
            parent : config.ticket.category,
            permissionOverwrites : [{
                id : message.guild.id,
                deny : 'VIEW_CHANNEL'
            }, {
                id : message.author.id,
                allow : ['VIEW_CHANNEL', 'SEND_MESSAGES']
            }, ...config.ticket.roles.map(id => ({
                id,
                allow : 'VIEW_CHANNEL'
            }))]
        })
        client.db.tickets[channel.id] = {
            author : message.author.id
        }
        fs.writeFileSync("./db.json", JSON.stringify(client.db))
        channel.send(new Discord.MessageEmbed()
            .setDescription(`Yo ${message.member}, un modérateur te répondra dès que possible. Tu peux expliquer ton problème, signalement ou recommandation.`)
            .setTitle("🎫 Tiket")
            .setColor('#000')
            .setTimestamp())
        message.channel.send(`Ton ticket ${channel}, a bien été créé !`)
    },
    name : 'ticket',
    help : {
        description : 'Crée un channel avec seul les modos et toi pour demander toutes les informations que tu veux !'
    }
}
*/