const fs = require('fs'),
    Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run : ({client, interaction}) => {
        if(!client.db.hierarchie[interaction.user.id]) return interaction.reply("Tu n'es pas assez puissant pour effectuer cette commande ninja, retourne t'entrainer !")
        const member = interaction.options.getUser('user'),
            level = interaction.options.getInteger('level'),
            levelAuthor = client.db.hierarchie[interaction.user.id],
            levelMember = client.db.hierarchie[member.id] || 0,
            ownerId = '755765421021331497'

        const levelBoard = {1: "ninja le plus puissant d'ce monde", 2: "admin", 3: "modo", 0: "genin"}

        if(member.bot) return interaction.reply("Je ne peux pas promure un garde...")
        if(levelMember === 1 && interaction.user.id !== ownerId) return interaction.reply("Tu es beteuh ou quoi ?") // s'il essaye de changer mon grade
        if(levelMember <= levelAuthor && levelMember !== 0 && interaction.user.id !== ownerId) return interaction.reply("Je ne peux que changer le grade des ninjas plus petit que le tiens...") // s'il essaye de changer le grade d'un ninja supérieur
        if(level <= levelAuthor && level !== 0 && interaction.user.id !== ownerId) return interaction.reply(`Je ne peux que promouvoir les ninjas à un grade inférieur au tiens, tu es grade ${levelAuthor} (${levelBoard[levelAuthor]})`) // s'il essaye de promouvoir un ninja à un grade égal ou supérieur au sien
        if(level === 0 && levelAuthor > 2) return interaction.reply("Désolée ninja, mais cette action est réservée aux admin, mp mouta au pire et demande lui") // s'il essaye de rétrograder entièrement un ninja alros qu'il n'es pas admin
        if(levelMember === level) return interaction.reply("Ce ninja est déjà à ce grade...") // s'il le met à un grade que le ninja est déjà

        if(level === 0){
            delete client.db.hierarchie[member.id]
            fs.writeFileSync("./db.json", JSON.stringify(client.db))
        }
        if(level !== 0){
            client.db.hierarchie[member.id] = level
            fs.writeFileSync("./db.json", JSON.stringify(client.db))
        }
        let sheesh = "PROMOTION"
        if(level > levelMember){
            sheesh = "RETROGRADATION"
        }
        // interaction.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
        //             .setTitle(`[${sheesh}] @<${member.id}>`)
        //             .addFields(
        //                 {name: "staff", value: `<@${interaction.user.id}>`, inline: true},
        //                 {name: "Rang", value: `${levelAuthor} (${levelBoard[levelAuthor]})`, inline: true},
        //                 {name: "ninja", value: `<@${member.id}>`, inline: false},
        //                 {name: "Rang", value: `${level} (${levelBoard[level]})`, inline: true},
        //                 {name: "Ancien rang", value: `${levelMember} (${levelBoard[levelMember]})`, inline: true}
        //             )
        //             .setThumbnail(member.displayAvatarURL())
        //             .setTimestamp()
        //             .setColor("#000"))
        return interaction.reply ("C'est bon 👍🏿")
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