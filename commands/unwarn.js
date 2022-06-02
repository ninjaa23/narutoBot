const fs = require('fs'),
    config = require('../config.json'),
    Discord = require('discord.js'),
    moment = require('moment')

moment.locale('fr')

module.exports = {
    run : ({client, interaction, levelBoard}) => {
        const member = interaction.options.getUser('user'),
            index = interaction.options.getInteger('chiffre'),
            raison =  interaction.options.getString('text') || "Aucune raison fournie.",
            levelAuthor = client.db.hierarchie[interaction.user.id] || 0,
            levelMember = client.db.hierarchie[member.id] || 0,
            ownerId = '755765421021331497'

        if(member.id === interaction.user.id && interaction.user.id !== ownerId) return interaction.reply("T'as cru que je suis beteuh ou quoi ?")
        if(levelAuthor === 0) return interaction.reply("Tu n'es pas assez puissant pour effectuer cette commande ninja, retourne t'entrainer !")
        if(levelMember !== 0 && levelAuthor >= levelMember && interaction.user.id !== ownerId) return interaction.reply(`Je ne peux que unwarn les ninjas à un grade inférieur du tiens, tu es grade ${levelAuthor} (${levelBoard[levelAuthor]})`)
        if(index < 1) return interaction.reply("Bon te fous pas de moi stp...")
        if(!client.db.warn[member.id]) return interaction.reply("Ce ninja n'a fait aucune bétises...")
        if(!client.db.warn[member.id][index - 1]) return interaction.reply("Ce warn n'existe pas, je crois que tu t'es trompé de chiffre")

        const warn = client.db.warn[member.id][index - 1]
        client.db.warn[member.id].splice([index - 1], 1)
        if(!client.db.warn[member.id].length) delete client.db.warn[member.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))

        interaction.guild.channels.cache.get(config.logs).send({embeds: [
            new Discord.MessageEmbed()
            .setAuthor(`[UNWARN] ${member.username}`, member.displayAvatarURL())
            .addField("staff", `<@${interaction.user.id}>`, false)
            .addField("Rang", `${levelAuthor} (${levelBoard[levelAuthor]})`, true)
            .addField("ninja", `<@${member.id}>`, false)
            .addField("Rang", `${levelMember} (${levelBoard[levelMember]})`, true)
            .addField("raison", `${raison}`, false)
            .addField("**ancienne raison**", `${warn['raison']}`, true)
            .addField("**staff qui a warn**", `<@${warn.staff['id']}> (${warn.staff['pseudo']})`)
            .addField("**date du warn**", `${moment(warn['date']).format(`DD/MM/YYYY [à] HH:mm:ss`)} (${moment(warn['date']).fromNow()})`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setColor("#000")
            .setTimestamp()
        ]})

        return interaction.reply("C'est bon 👍🏿")
    },
    name : 'unwarn'
}