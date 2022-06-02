const fs = require('fs'),
    config = require('../config.json'),
    Discord = require('discord.js')

module.exports = {
    run : ({client, interaction, levelBoard}) => {
        const member = interaction.options.getUser('user'),
            raison = interaction.options.getString('text') || "Aucune raison fournie."

        const levelAuthor = client.db.hierarchie[interaction.user.id] || 0,
            levelMember = client.db.hierarchie[member.id] || 0,
            ownerId = '755765421021331497'

        if(member.id === interaction.user.id) return interaction.reply("wtf pourquoi tu veux te warn mon reuf ça va pas ?")
        if(member.id === ownerId){
            return interaction.reply("Tu es beteuh ou quoi ?")
        }
        if(levelAuthor === 0) return interaction.reply("Tu n'es pas assez puissant pour effectuer cette commande ninja, retourne t'entrainer !")
        if(levelMember !== 0 && levelMember <= levelAuthor) return interaction.reply(`Je ne peux que warn les ninjas à un grade inférieur du tiens, tu es grade ${levelAuthor} (${levelBoard[levelAuthor]})`)

        if(!client.db.warn[member.id]) client.db.warn[member.id] = []
        client.db.warn[member.id].unshift({
            "date": Date.now(),
            "raison": raison,
            "staff": {"id": interaction.user.id, "pseudo": interaction.user.username, "level": levelAuthor},
        })
        fs.writeFileSync("./db.json", JSON.stringify(client.db))
        
        interaction.guild.channels.cache.get(config.logs).send({ embeds: [
            new Discord.MessageEmbed()
            .setAuthor(`[WARN] ${member.username}`, member.displayAvatarURL())
            .addField("staff", `<@${interaction.user.id}>`, false)
            .addField("Rang", `${levelAuthor} (${levelBoard[levelAuthor]})`, true)
            .addField("ninja", `<@${member.id}>`, false)
            .addField("Rang", `${levelMember} (${levelBoard[levelMember]})`, true)
            .addField("raison", `${raison}`, false)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setColor("#000")
            .setTimestamp()
        ]})

        return interaction.reply("C'est bon 👍🏿")
    },
    name : 'warn'
}