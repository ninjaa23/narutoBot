module.exports = {
    run : (message) => {
        message.reply("Cette commande est en maintenance désolée ninja..")
    },
    name : 'modset'
}
/*
const fs = require('fs'),
    Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run : (message, args, client) => {
        const mod = message.mentions.members.first(),
            level = args.slice(1).join(' ')
            if(!client.db.hierarchie.user[message.author.id]) return message.channel.send("T'es pas assez puissant pour le faire désolée ninja.. retourne t'entrainer !")
        const authLevel = client.db.hierarchie.user[message.author.id].level

        if(!mod) return message.channel.send("Veuillez me mentionner le ninja à promure chef !")
        if(mod.user.bot) return message.channel.send("J'ai pas le droit de promure des gardes..")
        if(client.db.hierarchie.user[mod.id]){
            const modLevel = client.db.hierarchie.user[mod.id].level
            if(modLevel <= authLevel && message.author.id != message.guild.ownerID) return message.channel.send("Tu n'es pas assez puissant ninja.. retourne t'entrainer !")
        }
        if(!level) return message.channel.send("Veuillez me donner le niveau de promution chef !")
        if(level < 0 || level > 3) return message.channel.send("Seul les grades 1, 2 et 3 sont disponnibles.")
        if(level < authLevel && level != 0) return message.channel.send(`Tu ne peux pas promouvoir un ninja à un grade suppérieur au tiens. **Tu es grade ${authLevel}.**`)
        
        if(level == 0){
            delete client.db.hierarchie.user[mod.id]
            fs.writeFileSync("./db.json", JSON.stringify(client.db))

            message.channel.send(`Le ninja ${mod} a été rétrogradé au rang de genin.`)
            message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
                .setAuthor(`[RETROGRADATION] ${mod.user.tag}`, mod.user.displayAvatarURL())
                .addField("ninja", mod, true)
                .addField("Modérateur", message.author, true)
                .addField("Rang", "Genin", true)
                .setColor("#000")
                .setTimestamp())
        }

        if(level != 0){
            client.db.hierarchie.user[mod.id] = {
                level : level
            }
            fs.writeFileSync("./db.json", JSON.stringify(client.db))

            message.channel.send(`Le ninja ${mod} a été promu au rang ${level} !`)
            message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
                .setAuthor(`[PROMUTION] ${mod.user.tag}`, mod.user.displayAvatarURL())
                .addField("ninja", mod, true)
                .addField("Modérateur", message.author, true)
                .addField("Rang", level, true)
                .setColor("#000")
                .setTimestamp())
        }
    },
    name : 'modset'
}
*/