const Discord = require('discord.js'),
    moment = require('moment')

moment.locale('fr')

module.exports = {
    run : ({client, interaction, levelBoard}) => {
        const member = interaction.options.getUser('user') || interaction.user,
            levelMember = client.db.hierarchie[member.id] || 0,
            levelAuthor = client.db.hierarchie[interaction.user.id] || 0,
            option = interaction.options.getInteger('info'),
            bump = client.db.bump[member.id] || 0

        if(option === 1){
            if(member.id !== interaction.user.id && levelAuthor === 0) return interaction.reply("Tu ne peux que consulter tes warns ninja.")
            if(levelAuthor >= levelMember && interaction.user.id !== '755765421021331497' && member.id !== interaction.user.id) return interaction.reply(`Je ne peux que te montrer les warns des ninjas à un grade inférieur du tiens, tu es grade ${levelAuthor} (${levelBoard[levelAuthor]})`)
            if(!client.db.warn[member.id] && member.id !== interaction.user.id) return interaction.reply("Ce ninja n'a fait aucune bétise.")
            if(!client.db.warn[member.id] && member.id === interaction.user.id) return interaction.reply("Tu n'as fais aucune bétise ninja.")

            interaction.reply({embeds: [
                new Discord.MessageEmbed()
                .setAuthor(`${member.username}`, member.displayAvatarURL())
                .addField("Ninja : ", `<@${member.id}>`)
                .addField("Rang : ", `${levelMember} (${levelBoard[levelMember]})`)
                .setDescription(`**Total de bétises : ** ${client.db.warn[member.id].length} ${client.db.warn[member.id].map((k, i) => `\n\n**${i+1} : ** \n**Date :** ${moment(k.date).format(`DD/MM/YYYY [à] HH:mm:ss`)} (${moment(k.date).fromNow()}) \n**Raison :** ${k.raison} \n**Staff :** <@${k.staff.id}> (${k.staff.pseudo}) \n**Rang staff :** ${k.staff.level} (${levelBoard[k.staff.level]})`)}`)
                .setColor("#000")
                .setTimestamp()
            ]})
        }else{
            interaction.reply({embeds: [
                new Discord.MessageEmbed()
                .setAuthor(`${member.username}`, member.displayAvatarURL())
                .addField("Ninja : ", `<@${member.id}>`)
                .addField("Tag : ", `#${member.discriminator}`)
                .addField("Rang : ", `${levelMember} (${levelBoard[levelMember]})`)
                .addField("Date de naissance : ", `${moment(member.createdAt).format(`DD/MM/YYYY [à] HH:mm:ss`)} (${moment(member.createdAt).fromNow()})`)
                .addField("Date d'arrivée : ", `${moment(interaction.guild.joinedTimestamp).format(`DD/MM/YYYY [à] HH:mm:ss`)} (${moment(interaction.guild.joinedTimestamp).fromNow()})`)
                .addField("Bumps : ", `${bump}`)
                .addField("Boost ? ", member.premiumSince ? moment(interaction.guild.premiumSince).format(`DD/MM/YYYY [à] HH:mm:ss`) + ` (${moment(interaction.guild.premiumSince).fromNow()})` : "Ce ninja ne boost pas le village.")
                .addField("Nombre de boost : ", `${interaction.guild.premiumSubscriptionCount}`)
                .addField("Nombre de bétises : ", `${client.db.warn[member.id] ? client.db.warn[member.id].length : "Ce ninja est sage comme une image !"}`)
                .setColor("#000")
                .setTimestamp()
            ]})
        }
    },
    name : 'userinfo'
}