module.exports = {
    run : (message) => {
        message.reply("Cette commande est en maintenance désolée ninja..")
    },
    name : 'ban'
}
/*
const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run : async(message, args, client) =>  {
        client.db = require('../db.json')
        const member = message.mentions.members.first()
            
        if(!client.db.hierarchie.user[message.author.id] ) return message.reply("Tu n'es que genin, tu ne peux pas prendre ce genre de décisions. Tu peux faire un ticket et le demander à quelqu'un de supérieur si tu le souhaites.")
        if(!member) return message.channel.send("Mentionne-moi qui je dois exterminer, il va gouter à mon rasengan !")
        if(member.id === message.author.id) return message.reply("Pourquoi veut-tu t'exclure quelque chose ne va pas ninja ?")

        if(member.id === message.guild.ownerID) {
            message.channel.send("Ahhh donc comme ca tu veux ban mon créateur ? TOI T'ES MORT !")
            tssoua = 1
            reason = "Tentative de coup d'Etat"
            console.log(`${member.tag} (${member.id}) vient d'être banni par moi même pour "${reason}".`)
            await message.member.ban({reason})
        }

        const authLevel = client.db.hierarchie.user[message.author.id].level
        let modlevel
        if(client.db.hierarchie.user[member.id]) modlevel = client.db.hierarchie.user[member.id].level

        let reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        let tssoua = 0

        if(tssoua === 0){
            if(authLevel >= modlevel) return message.channel.send("Tu n'es pas assez puissant pour l'exclure ninja, parles en à des personnes au dessus.")
            if(authLevel == 3) return message.reply("Tu n'es que modérateur, tu ne peux pas bannir les ninjas de ce serveur. Parles-en à un administrateur.")
            if(!member.bannable) return message.channel.send("Je n'arrive pas à malaxer mon chakra je ne peux pas le faire désolée..")
            await member.ban({reason})
        }

        message.channel.send(`${member.user.tag} à été correctement détruit ! CHEHH\n
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
            .addField("Durée", "∞", true)
            .setColor("#000")
            .setTimestamp())
    },
    name : 'ban',
    help : {
        description : 'Pour botter le cul de fdp !',
        syntax : '<@leFdp> [raison]'
    }
}
*/