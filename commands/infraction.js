module.exports = {
    run : (message) => {
        message.reply("Cette commande est en maintenance désolée ninja..")
    },
    name : 'infraction'
}
/*
const moment = require('moment'),
    Discord = require('discord.js')

moment.locale('fr')

module.exports = {
    run : async(message, args, client) =>  {
        const member = message.mentions.members.first()
        if(!message.member.hasPermission('MANAGE_MESSAGES') && message.author !== member) return message.channel.send("T'es pas assez puissant pour le faire désolée ninja.. retourne t'entrainer !")
        if(!member) return message.channel.send("Mentionne-moi qui tu veux voir.")
        if(!client.db.warns[member.id]) return message.channel.send("Ce ninja n'a fait aucune bétise.")
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`**Total de bétises : ** ${client.db.warns[member.id].length}\n\n__**10 derniers warns :**__${client.db.warns[member.id].slice(0, 10).map((warn, i) => `\n\n**${i+1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`)}`))
    },
    name : 'infraction',
    help : {
        description : "Affiche toutes les bétises d'un ninja.",
        syntax : "<@leNinja>"
    }
}
*/