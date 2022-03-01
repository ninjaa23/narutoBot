module.exports = {
    run : (message) => {
        message.reply("Cette commande est en maintenance désolée ninja..")
    },
    name : 'userinfo'
}
/*
const Discord = require('discord.js')
    moment = require('moment')

module.exports = {
    run : (message, client) => {
        const member = message.mentions.members.first() || message.member
        message.channel.send(new Discord.MessageEmbed()
            .addField('Membre', member, true)
            .addField('Tag', member.user.tag, true)
            .addField('Date de création du compte', moment(member.user.createdAt).format(`[Le] DD/MM/YYYY [à] HH:mm:ss`), true)
            .addField("Date d'arriée sur le serveur", moment(member.joinedAt).format(`[Le] DD/MM/YYYY [à] HH:mm:ss`), true)
            .addField("Date du début de boost", member.premiumSince ? moment(member.premiumSince).format(`[Le] DD/MM/YYYY [à] HH:mm:ss`) : 'Ne boost pas', true)
            .addField("Bétises", client.db.warns[member.id] ? client.db.warns[member.id].length : 'Sage comme une image', true)
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter(`ID : ${member.id}`))
    },
    name : 'user-info',
    help : {
        description : "Informations sur un compte",
        syntax : "<@leNinja>"
    }
}
*/