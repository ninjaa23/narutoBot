module.exports = {
    run : (message) => {
        message.reply("Cette commande est en maintenance désolée ninja..")
    },
    name : 'mute'
}
/*
const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run : async (message, args, client) => {
        client.db = require('../db.json')
        const member = message.mentions.members.first()
        let muteRoleA = '838444923505344552' // mute (cheh)
        let muteRoleR = '835929704351137797' // Ninja

        if(!member) return message.channel.send("Mentionne-moi qui je dois exterminer, il va gouter au sharingan de yagsaw !")
        if(member.id === message.author.id) return message.reply("Pourquoi veut-tu te muter, quelque chose ne va pas ?")

        let authLevel
        let modLevel
        if(client.db.hierarchie.user[member.id]) modLevel = client.db.hierarchie.user[member.id].level
        if(client.db.hierarchie.user[message.author.id]) authLevel = client.db.hierarchie.user[message.author.id].level
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'

        let tssoua = 0
        if(member.id === message.guild.ownerID) {
            message.channel.send("Ahhh donc comme ca tu veux muter mon créateur ? TOI T'ES MORT !")
            reason = "Tentive de coup d'Etat"
            member = message.author
            tssoua = 1
            await message.member.roles.add(muteRoleA)
            await message.member.roles.remove(muteRoleR)
        }

        if(!authLevel) return message.reply("Tu n'es que genin, tu ne peux pas prendre ce genre de décisions. Tu peux faire un ticket et le demander à quelqu'un de supérieur.")
        if(tssoua === 0){
            if(modLevel) return message.channel.send("Tu ne peux pas muter des membres du staff malheuresement. Si tu es suppérieur, tu peux le retrograder puis le muter.")
            await member.roles.add(muteRoleA)
            await member.roles.remove(muteRoleR)
        }
        
        message.channel.send(`${member} est dans un genjutsu (cheh).`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[MUTE] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField("Utilisateur", member, true)
            .addField("Modérateur", message.author, true)
            .addField("Raison", reason, true)
            .addField("Durée", "∞", true)
            .setColor("#000")
            .setTimestamp())
    },
    name : 'mute',
    help : {
        description : "Mute une pouffiasse.",
        syntax : "<@laPouffiasse>"
    }
}
*/