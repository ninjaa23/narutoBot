module.exports = {
    run : (message) => {
        message.reply("Cette commande est en maintenance désolée ninja..")
    },
    name : 'unmute'
}
/*
const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run : async (message, client) => {
        const args = message.content.trim().split(/ +/g)
        client.db = require('../db.json')
        const member = message.mentions.members.first()
        let muteRoleR = '838444923505344552' // mute (cheh)
        let muteRoleA = '835929704351137797' // Ninja

        if(!member) return message.channel.send("Mentionne-moi qui je dois soigner.")
        let authLevel
        let modLevel
        if(client.db.hierarchie.user[member.id]) modLevel = client.db.hierarchie.user[member.id].level
        if(client.db.hierarchie.user[message.author.id]) authLevel = client.db.hierarchie.user[message.author.id].level
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'

        if(member.id === message.guild.ownerID) return message.reply("Ce ninja est trop sage pour être muté.")
        if(!authLevel) return message.reply("Tu n'es que genin, tu ne peux pas prendre ce genre de décisions. Tu peux faire un ticket et le demander à quelqu'un de supérieur.")
        if(modLevel) return message.channel.send("Tu ne peux pas muter des membres du staff malheuresement. Si tu es suppérieur, tu peux le retrograder puis le muter.")

        await member.roles.remove(muteRoleR)
        await member.roles.add(muteRoleA)

        message.channel.send(`${member} à été correctement unmuté repose toi maintenant.`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[UNMUTE] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField("Utilisateur", member, true)
            .addField("Modérateur", message.author, true)
            .addField("Raison", reason, true)
            .setColor("#000")
            .setTimestamp())
    },
    name : 'unmute',
    help : {
        description : "Démute un ninja.",
        syntax : "<@leNinja>"
    }
}
*/