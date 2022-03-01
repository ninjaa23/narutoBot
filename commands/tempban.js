module.exports = {
    run : (message) => {
        message.reply("Cette commande est en maintenance désolée ninja..")
    },
    name : 'tempban'
}
/*
const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration'),
    Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run : async(message, args, client) =>  {
        client.db = require('../db.json')
        let authLevel
        if(client.db.hierarchie.user[message.author.id]){
            authLevel = client.db.hierarchie.user[message.author.id].level
        }

        let tssoua = 0
        let member = message.mentions.members.first()
        let modLevel
        if(client.db.hierarchie.user[member.id]) modLevel = client.db.hierarchie.user[member.id].level
        if(!member) return message.channel.send("Mentionne-moi qui je dois exterminer, il va gouter à mon rasengan !")
        if(member.id === message.author.id) return message.reply("Pourquoi veut-tu t'exclure quelque chose ne va pas ?")
        const duration = parseDuration(args[1])
        if(!duration) return message.channel.send("Dis moi je dois le mettre hors d'état de nuire combien de temps.")
        let reason = args.slice(2).join(' ') || 'Aucune raison fournie'

        if(member.id === message.guild.ownerID) {
            member = message.member
            tssoua = 1
            reason = "Tentative de coup d'Etat."
            message.channel.send("Ahhh donc comme ca tu veux ban mon créateur ? TOI T'ES MORT !")
            message.member.ban({reason})
        }

        if(!authLevel && tssoua === 0) return message.reply("Tu n'es que genin, tu ne peux pas prendre ce genre de décisions. Tu peux faire un ticket et le demander à quelqu'un de supérieur.")
        if(authLevel >= modLevel && tssoua === 0) return message.channel.send("Tu n'es pas assez puissant pour l'exclure ninja, parles en à des personnes au dessus.")
        if(authLevel == 3 && tssoua === 0) return message.reply("Tu n'es que modérateur, tu ne peux pas bannir les ninjas de ce serveur. Parles-en à un administrateur.")
        if(!member.bannable && tssoua === 0) return message.channel.send("Je n'arrive pas à malaxer mon chakra je ne peux pas le faire désolée..")

        if(member.id !== message.author.id) await member.ban({reason})
        message.channel.send(`${member.user.tag} à été mis hors d'état de nuire pendant ${humanizeDuration(duration, {language: 'fr'})} ! CHEHH \n
        ⣿⣿⣿⣿⣿⠿⢃⣴⣿⣇⡙⢿⣷⣄⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿
        ⣿⣿⣿⡟⢋⣴⣿⣿⣄⠨⣍⡀⠙⣿⡇⢸⣿⣿⣿⣿⣿⣿⣿⣿
        ⣿⡿⢉⣴⣿⣿⡈⣉⠛⢷⣌⣻⣿⠟⣡⣾⣿⣿⣿⣿⣿⣿⣿⣿
        ⢃⣴⠿⢋⣉⠻⢧⡈⢴⣦⣾⠟⢡⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
        ⡘⢿⣷⣌⠁⣶⢌⣿⣾⠟⢡⣶⣌⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
        ⣷⣦⠙⢿⣷⣤⣾⠟⣡⣶⣦⠙⢿⣷⣌⠹⣿⣿⣿⣿⣿⣿⣿⣿
        ⣿⣿⣿⣆⣉⣉⣡⣾⣿⣿⣿⣿⣆⡙⢿⣷⣄⠻⢿⣿⣿⣿⣿⣿
        ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⡙⢿⣷⣌⠛⣿⣿⣿⣿
        ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⠙⢿⣷⣌⠹⣿⣿
        ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⡙⢁⣴⣦⠙`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[BAN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField("Utilisateur", member, true)
            .addField("Modérateur", message.author, true)
            .addField("Raison", reason, true)
            .addField("Durée", humanizeDuration(duration, {language: 'fr'}), true)
            .setColor("#000")
            .setTimestamp())
            
        setTimeout(() => {
            message.guild.members.unban(member)

            message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[UNBAN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField("Utilisateur", member, true)
            .addField("Modérateur", message.author, true)
            .addField("Raison", reason, true)
            .addField("Durée", humanizeDuration(duration, {language: 'fr'}), true)
            .setColor("#000")
            .setTimestamp())
        }, duration)
    },
    name : 'tempban',
    help : {
        description : "Pour mettre un fdp hors d'état de nuire pendant un certain temps.",
        syntax : "<@leFdp> <le temp du ban avec l'unité> [raison]"
    }
}
*/