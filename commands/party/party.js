const config = require('../../config.json')

module.exports = {
    run : async({interaction, db}) => {
        const titre = interaction.options.getString('titre'),
            confidentialite = interaction.options.getInteger('confidentialite'),
            capacite = interaction.options.getInteger('capacite')
        
        const member = interaction.user,
            sheeesh = interaction.guild.members.cache.get(member.id)

        if(!sheeesh.voice.channel) return interaction.reply(`Tu n'es pas en voc mon reuf, va dans <#${config.party}>`)
        if(titre.length > 100) return interaction.reply(`Le titre de ta party ne doit pas dépasser les 100 caractères, il fait ${titre.length} caractères. Tiens pour éviter de tout reécrire ninja : ${titre}`)
        if(capacite && capacite > 99) return interaction.reply("Le maximum d'une limitation est de 99 ninjas.")
        if(capacite && capacite < 1) return interaction.reply("Tu te fous de ma gueule sale table basse ikea ?")

        if(confidentialite){
            // privée
            var partyf = await interaction.guild.channels.create(`${titre}`, {
                type : 'GUILD_VOICE',
                parent : config.party_parent,
                userLimit : capacite,
                permissionOverwrites : [{
                    id : config.ninja,
                    deny : ['VIEW_CHANNEL']
                },
                {
                    id : member.id,
                    allow : ['ADD_REACTIONS', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS', 'CONNECT', 'SPEAK', 'USE_APPLICATION_COMMANDS', 'CREATE_PUBLIC_THREADS', 'USE_EXTERNAL_STICKERS'],
                    deny : ['CREATE_INSTANT_INVITE']
                }]
            })
        }else{
            // public
            var partyf = await interaction.guild.channels.create(`${titre}`, {
                type : 'GUILD_VOICE',
                parent : config.party_parent,
                userLimit : capacite,
                permissionOverwrites : [{
                    id : config.ninja,
                    allow : ['CREATE_INSTANT_INVITE', 'ADD_REACTIONS', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS', 'CONNECT', 'SPEAK', 'USE_APPLICATION_COMMANDS', 'CREATE_PUBLIC_THREADS', 'USE_EXTERNAL_STICKERS']
                }]
            })
        }
        const channelid = partyf.id
        const party = interaction.guild.channels.cache.get(channelid)

        db.query((`INSERT INTO party (titre, confidentialite, capacite, channelid, owner) VALUES ("${encodeURIComponent(titre)}", ${confidentialite}, ${capacite}, '${channelid}', '${member.id}')`))
        party.send(`Bienvenu dans ${titre} !`)
        sheeesh.voice.setChannel(party)
        interaction.reply("C'est bon 👍🏿")
    },
    name: 'party'
}