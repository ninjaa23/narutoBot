module.exports = {
    run : (message) => {
        message.reply("Cette commande est en maintenance désolée ninja..")
    },
    name : 'tempmute'
}
/*
const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration'),
    Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run : async (message, args, client) => {
        client.db = require('../db.json')
        let member = message.mentions.members.first()
        let muteRoleA = '838444923505344552' // mute (cheh)
        let muteRoleR = '835929704351137797' // Ninja

        if(!member) return message.channel.send("Mentionne-moi qui je dois exterminer, il va gouter au sharingan de yagsaw !")
        if(member.id === message.author.id) return message.reply("Pourquoi veut-tu te muter, quelque chose ne va pas ?")
        const duration = parseDuration(args[1])
        if(!duration) return message.channel.send("Dis moi je dois le mettre hors d'état de nuire combien de temps.")
        let tssoua = 0
        let authLevel
        let modLevel
        if(client.db.hierarchie.user[member.id]) modLevel = client.db.hierarchie.user[member.id].level
        if(client.db.hierarchie.user[message.author.id]) authLevel = client.db.hierarchie.user[message.author.id].level
        let reason = args.slice(2).join(' ') || 'Aucune raison fournie'

        if(member.id === message.guild.ownerID) {
            member = message.member
            tssoua = 1
            reason = "Tentative de coup d'Etat."
            message.channel.send("Ahhh donc comme ca tu veux ban mon créateur ? TOI T'ES MORT !")
            await message.member.roles.add(muteRoleA)
            await message.member.roles.remove(muteRoleR)
        }

        if(tssoua === 0){
            if(!authLevel) return message.reply("Tu n'es que genin, tu ne peux pas prendre ce genre de décisions. Tu peux faire un ticket et le demander à quelqu'un de supérieur.")
            if(modLevel) return message.channel.send("Tu ne peux pas muter des membres du staff malheuresement. Si tu es suppérieur, tu peux le retrograder puis le muter.")
            await member.roles.add(muteRoleA)
            await member.roles.remove(muteRoleR)
        }

        message.channel.send(`${member} est dans un genjutsu pendant ${humanizeDuration(duration, {language : 'fr'})} (cheh).`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[MUTE] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField("Utilisateur", member, true)
            .addField("Modérateur", message.author, true)
            .addField("Raison", reason, true)
            .addField("Durée", humanizeDuration(duration, {language : 'fr'}), true)
            .setColor("#000")
            .setTimestamp())

        setTimeout(() => {
            if(member.delete || !member.manageable) return
            member.roles.remove(muteRoleA)
            member.roles.add(muteRoleR)
            message.channel.send(`${member} a rompu son genjutsu !`)
        }, duration)
    },
    name : 'tempmute',
    help : {
        description : "Mute une pouffiasse pendant un certain temp.",
        syntax : "<@laPouffiasse> <le temps avec l'unité>"
    }
}
*/