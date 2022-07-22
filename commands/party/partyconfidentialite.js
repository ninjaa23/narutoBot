const config = require('../../config.json')

module.exports = {
    run : ({interaction, db}) => {
        const confidentialite = interaction.options.getInteger('confidentialite'),
            fakemember = interaction.user,
            member = interaction.guild.members.cache.get(fakemember.id)

        if(!member.voice.channel) return interaction.reply("t'as oublié d'être en voc ?")
        if(member.voice.channel.parentId != config.party_parent || member.voice.channel.id == "993861078297620580") return interaction.reply("Tu n'es pas dans une party vocal ninja.")

        db.query(`SELECT owner, confidentialite FROM party WHERE channelid = ${member.voice.channel.id};`,
            (err, result) => {
                if(err) return console.log(err)
                const owner = result[0]['owner'],
                    partyConfidentialite = result[0]['confidentialite']

                if((owner != fakemember.id && (levelAuthor > 2 || levelAuthor == 0)) || (owner == '755765421021331497' && fakemember.id != '755765421021331497')) return interaction.reply("Tu n'es pas le chef de la party ninja.")
                if(confidentialite == partyConfidentialite) return interaction.reply(`La party est déjà ${confidentialite ? "privée" : "public"}`)

                if(!confidentialite){
                    member.voice.channel.permissionOverwrites.create(config.ninja, {CREATE_INSTANT_INVITE: true, ADD_REACTIONS: true, STREAM: true, VIEW_CHANNEL: true, SEND_MESSAGES: true, SEND_TTS_MESSAGES: true, EMBED_LINKS: true, ATTACH_FILES: true, READ_MESSAGE_HISTORY: true, USE_EXTERNAL_EMOJIS: true, CONNECT: true, SPEAK: true, USE_APPLICATION_COMMANDS: true, CREATE_PUBLIC_THREADS: true, USE_EXTERNAL_STICKERS: true})
                }else member.voice.channel.permissionOverwrites.create(config.ninja), {VIEW_CHANNEL: false}

                db.query(`UPDATE party SET confidentialite = ${confidentialite} WHERE channelid = ${member.voice.channel.id};`)
                interaction.reply("C'est bon 👍🏿")
                return member.voice.channel.send(`La party est maintenant ${confidentialite ? "privée" : "public"}`)
            })
    },
    name: 'partyconfidentialite'
}