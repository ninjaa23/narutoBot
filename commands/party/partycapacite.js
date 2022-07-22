const config = require('../../config.json')

module.exports = {
    run : ({interaction, db, client}) => {
        const capacite = interaction.options.getInteger('capacite'),
        fakemember = interaction.user,
        member = interaction.guild.members.cache.get(fakemember.id),
        levelAuthor = client.db.hierarchie[interaction.user.id] || 0

        if(!member.voice.channel) return interaction.reply("t'as oublié d'être en voc ?")
        if(member.voice.channel.parentId != config.party_parent || member.voice.channel.id == "993861078297620580") return interaction.reply("Tu n'es pas dans une party vocal ninja.")

        if(capacite < 1) return interaction.reply("frero ?")
        if(capacite > 99) return interaction.reply("Le maximum d'une limitation est de 99 ninjas.")

        db.query(`SELECT owner, capacite FROM party WHERE channelid = ${member.voice.channel.id};`,
        (err, result) => {
            if(err) return console.log(err)
            const owner = result[0]['owner'],
                partyCapacite = result[0]['capacite']
            
            if((owner != fakemember.id && (levelAuthor > 2 || levelAuthor == 0)) || (owner == '755765421021331497' && fakemember.id != '755765421021331497')) return interaction.reply("Tu n'es pas le chef de la party ninja.")
            if(capacite == partyCapacite) return interaction.reply("Donc la tu m'appelles pour des trucs inutiles genre ?")

            member.voice.channel.setUserLimit(capacite)
            db.query(`UPDATE party SET capacite = ${capacite} WHERE channelid = ${member.voice.channel.id}`)
            interaction.reply("C'est bon 👍🏿")
            return member.voice.channel.send(`La limite de ninjas dans la party est maintenant de ${capacite}`)
        })
    },
    name: 'partycapacite'
}