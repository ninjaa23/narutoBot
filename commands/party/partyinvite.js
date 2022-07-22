const config = require('../../config.json')

module.exports = {
    run : ({client, interaction, db}) => {
        const ninja = interaction.options.getUser('user'),
            fakemember = interaction.user,
            member = interaction.guild.members.cache.get(fakemember.id),
            levelAuthor = client.db.hierarchie[interaction.user.id] || 0,
            realNinja = interaction.guild.members.cache.get(ninja.id)
        
        if(!member.voice.channel) return interaction.reply("t'es meme pas en voc tu veux inviter qui hmar ?")
        if(member.voice.channel.parentId != config.party_parent || member.voice.channel.id == "993861078297620580") return interaction.reply("Tu n'es pas dans une party vocal ninja.")
        if(realNinja.voice.channel){
            if(realNinja.voice.channel.id == member.voice.channel.id) return interaction.reply("Il est déjà en vocal avec toi hmar")
        }
        if(fakemember.id == ninja.id) return interaction.reply("Tu es beteuh ?")

        db.query(`SELECT owner, confidentialite, titre FROM party WHERE channelid = ${member.voice.channel.id};`,
            (err, result) => {
                if(err) return console.log(err)
                const owner = result[0]['owner'],
                    confidentialite = result[0]['confidentialite'],
                    titre = result[0]['titre']
                
                db.query(`SELECT * FROM partyInvite WHERE channelid = ${member.voice.channel.id};`,
                    (err, result) => {
                        if(err) return console.log(err)
                        const ninjaid = []
                        for (let i = 0; i < result.length; i++) {
                            ninjaid.push(result[i]['ninjaid'])
                        }

                        if(ninjaid.indexOf(ninja.id) != -1) return interaction.reply("Ce ninja a déjà été invité.")

                        if(!confidentialite){
                            db.query(`INSERT INTO partyInvite (channelid, ninjaid, authorid) VALUES ('${member.voice.channel.id}', '${ninja.id}', '${fakemember.id}');`)
                            member.voice.channel.send(`${ninja} tu as été invité par ${fakemember} dans ${titre} !`)
                        }else{
                            if((owner != fakemember.id && (levelAuthor > 2 || levelAuthor == 0)) || (owner == '755765421021331497' && fakemember.id != '755765421021331497')) return interaction.reply("Tu n'es pas le chef de la party ninja.")
                            
                            db.query(`INSERT INTO partyInvite (channelid, ninjaid, authorid) VALUES ('${member.voice.channel.id}', '${ninja.id}', '${fakemember.id}');`)
                            member.voice.channel.permissionOverwrites.create(ninja.id, {CREATE_INSTANT_INVITE: true, ADD_REACTIONS: true, STREAM: true, VIEW_CHANNEL: true, SEND_MESSAGES: true, SEND_TTS_MESSAGES: true, EMBED_LINKS: true, ATTACH_FILES: true, READ_MESSAGE_HISTORY: true, USE_EXTERNAL_EMOJIS: true, CONNECT: true, SPEAK: true, USE_APPLICATION_COMMANDS: true, CREATE_PUBLIC_THREADS: true, USE_EXTERNAL_STICKERS: true})
                            member.voice.channel.send(`${ninja} tu as été invité par ${fakemember} dans ${titre} !`)
                        }
                        return interaction.reply("C'est bon 👍🏿")
                    })
            })
        },
    name: 'partyinvite'
}