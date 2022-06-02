const fs = require('fs'),
    Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run : ({client, interaction, levelBoard}) => {
        if(!client.db.hierarchie[interaction.user.id]) return interaction.reply("Tu n'es pas assez puissant pour effectuer cette commande ninja, retourne t'entrainer !")
        const member = interaction.options.getUser('user'),
            level = interaction.options.getInteger('level'),
            levelAuthor = client.db.hierarchie[interaction.user.id],
            levelMember = client.db.hierarchie[member.id] || 0,
            ownerId = '755765421021331497'

        if(member.bot) return interaction.reply("Je ne peux pas promure un garde...")
        if(levelMember === 1 && interaction.user.id !== ownerId) return interaction.reply("Tu es beteuh ou quoi ?") // s'il essaye de changer mon grade
        if(member.id === interaction.user.id && (level > levelMember || level === 0)) return interaction.reply("wsh mon reuf pourquoi tu veux te rétrograder ?") // s'il essaye de s'auto rétrograder
        if(member.id === interaction.user.id && (level < levelMember && level !== 0)) return interaction.reply("T'as cru que je suis beteuh ou quoi ?") // s'il essaye de s'auto promure
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
        if(level > levelMember && levelMember !== 0){
            sheesh = "RETROGRADATION"
        }
        interaction.guild.channels.cache.get(config.logs).send({embeds: [
            new Discord.MessageEmbed()
            .setAuthor(`[${sheesh}] ${member.username}`, member.displayAvatarURL())
            .addField("staff", `<@${interaction.user.id}>`, false)
            .addField("Rang", `${levelAuthor} (${levelBoard[levelAuthor]})`, true)
            .addField("ninja", `<@${member.id}>`, false)
            .addField("Rang", `${level} (${levelBoard[level]})`, true)
            .addField("Ancien rang", `${levelMember} (${levelBoard[levelMember]})`, true)
            .setColor("#000")
            .setThumbnail(interaction.user.displayAvatarURL())
            .setTimestamp()]})

        return interaction.reply ("C'est bon 👍🏿")
    },
    name : 'modset'
}