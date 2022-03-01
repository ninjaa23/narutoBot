module.exports = {
    run : (message) => {
        message.reply("Cette commande est en maintenance désolée ninja..")
    },
    name : 'unwarn'
}
/*
const fs = require('fs'),
    Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run : async(message, args, client) =>  {
        const member = message.mentions.members.first()

        if(!member) return message.channel.send("Mentionne-moi qui est devenu gentil.")
        if(member.id === message.author.id) return message.reply("Tu ne peux pas te unwarn tout seul voyons ?")

        let authLevel
        let modLevel
        if(client.db.hierarchie.user[member.id]) modLevel = client.db.hierarchie.user[member.id].level
        if(client.db.hierarchie.user[message.author.id]) authLevel = client.db.hierarchie.user[message.author.id].level
        const warnIndex = parseInt(args[1], 10) - 1

        if(member.id === message.guild.ownerID) return message.reply("Ce ninja est trop sage pour avoir fais une bétise.")
        if(!client.db.warns[member.id]) return message.channel.send("Ce ninja n'a fait aucune bétise.")
        if((!warnIndex) && (warnIndex !== 0)) return message.channel.send("Quel bétise doit être supprimé ?")
        if(warnIndex < 0 || !client.db.warns[member.id][warnIndex]) return message.channel.send("Tu crois que c'est du respect ça mon garçon ?")
        const { reason } = client.db.warns[member.id].splice(warnIndex, 1)[0]

        if(!authLevel) return message.reply("Tu n'es que genin, tu ne peux pas prendre ce genre de décisions. Tu peux faire un ticket et le demander à quelqu'un de supérieur.")
        if(authLevel >= modLevel) return message.channel.send("Tu n'es pas assez puissant pour le unwarn ninja, parles-en à des personnes au dessus.")

        if(!client.db.warns[member.id].length) delete client.db.warns[member.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))

        message.channel.send(`${member} a été unwarn de : ${reason}.`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[UNWARN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField("Utilisateur", member, true)
            .addField("Modérateur", message.author, true)
            .addField("Warn supprimé", reason, true)
            .setColor("#000")
            .setTimestamp())
    },
    name : 'unwarn',
    help : {
        description : "Enlève la bétise d'un ninja.",
        syntax : "<@leNinja> <le numéro de la bétise>"
    }
}
*/