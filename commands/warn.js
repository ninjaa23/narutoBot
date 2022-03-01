module.exports = {
    run : (message) => {
        message.reply("Cette commande est en maintenance désolée ninja..")
    },
    name : 'warn'
}
/*
const fs = require('fs'),
    Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run : async(message, args, client) =>  {
        const member = message.mentions.members.first()

        if(!member) return message.channel.send("Mentionne-moi qui n'est pas gentil.")
        if(member.id === message.author.id) return message.reply("Pourquoi veut-tu te warn, quelque chose ne va pas ?")
        if(member.id === message.guild.ownerID) return message.channel.send("Ce ninja est trop gentil pour le warn.")

        let authLevel
        let modLevel
        if(client.db.hierarchie.user[member.id]) modLevel = client.db.hierarchie.user[member.id].level
        if(client.db.hierarchie.user[message.author.id]) authLevel = client.db.hierarchie.user[message.author.id].level
        if(!authLevel) return message.reply("Tu n'es que genin, tu ne peux pas prendre ce genre de décisions. Tu peux faire un ticket et le demander à quelqu'un de supérieur.")
        if(authLevel >= modLevel) return message.channel.send("Tu n'es pas assez puissant pour le warn ninja, parles-en à des personnes au dessus.")

        const reason = args.slice(1).join(' ')
        if(!reason) return message.channel.send("Tu ne m'as pas dis le motif du warn ninja.")

        if(!client.db.warns[member.id]) client.db.warns[member.id] = []
        client.db.warns[member.id].unshift({
            reason,
            date : Date.now(),
            mod : message.author.id
        })
        fs.writeFileSync('./db.json', JSON.stringify(client.db))

        message.channel.send(`${member} a été warn pour ${reason}.`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[WARN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField("Utilisateur", member, true)
            .addField("Modérateur", message.author, true)
            .addField("Raison", reason, true)
            .setColor("#000")
            .setTimestamp())
    },
    name : 'warn',
    help : {
        description : "Enregistre la bétise d'un ninja.",
        syntax : "<@leNinja> <la bétise>"
    }
}
*/