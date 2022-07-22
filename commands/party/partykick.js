const config = require('../../config.json')

module.exports = {
    run: ({client, interaction, db}) => {
        const ninja = interaction.options.getUser('user'),
            fakemember = interaction.user,
            member = interaction.guild.members.cache.get(fakemember.id),
            levelAuthor = client.db.hierarchie[fakemember.id] || 0,
            realNinja = interaction.guild.members.cache.get(ninja.id),
            levelNinja = client.db.hierarchie[ninja.id] || 0

        if(!member.voice.channel) return interaction.reply("t'es meme pas en voc tu veux kick qui hmar ?")
        if(member.voice.channel.parentId != config.party_parent || member.voice.channel.id == "993861078297620580") return interaction.reply("Tu n'es pas dans une party vocal ninja.")
        if(realNinja.voice.channel){
            if(realNinja.voice.channel.id != member.voice.channel.id) return interaction.reply("il est pas dans ta party")
        }
        if(fakemember.id == ninja.id) return interaction.reply("Tu es beteuh ?")
        
        db.query(`SELECT owner FROM party WHERE channelid = ${member.voice.channel.id};`,
            (err, result) => {
                if(err) return console.log(err)
                const owner = result[0]['owner']

                if((owner != fakemember.id && (levelAuthor > 2 || levelAuthor == 0)) || (owner == '755765421021331497' && fakemember.id != '755765421021331497')) return interaction.reply("Tu n'es pas le chef de la party ninja.")
                realNinja.voice.disconnect()
                return interaction.reply("C'est bon 👍🏿")
            })
    },
    name: 'partykick'
}