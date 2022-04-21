/*
const Discord = require('discord.js')

module.exports = {
    run : (message, client) => {
        const btn = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setStyle('SUCCESS')
                .setLabel("Accepter le contrat de secte")
                .setCustomId("regle")
                .setEmoji('✅')
            )

        message.guild.channels.cache.get('835900574552686622').send({content: `
**Bienvenue sur CHOUPIIKAAA ! **
Tu es sur un serveur assez libre dans lequel tu peux parler de tout et n'importe quoi, juste pas de contenue pornographique et reste calme dans les débats _(ils ne sont pas interdit mais ne deviens pas hystérique, discutez simplement)_ et bien sûr soyez respectueux entre vous et amusez vous. A la base ce serveur a été créé pour parler de sujets informatiques et jouer mais maintenant nous avons un serveur minecraft et préparons pleins de projets mais cela prend énormément de temps _(et il y a les cours qui clc aussi)_ donc en attendant tu peux prendre ta place parmi nous et jouer avec nous.
||_ps : parle ne reste pas comme un cadavre, tout le monde vient et ne parle jamais \😭 _||`, components: [btn]})
    },
    name : 'regle'
}
*/