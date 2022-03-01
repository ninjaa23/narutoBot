/*
const Discord = require('discord.js')

module.exports = {
    run : (message, client) => {
        const menu = new Discord.MessageActionRow().addComponents(
            new Discord.MessageSelectMenu()
                .setCustomId("plateforme")
                .setPlaceholder("Choisis tes plateformes !")
                .setMinValues(0)
                .setMaxValues(5)
                .addOptions([
                    {
                        label: "Ordinateur",
                        value: "ordinateur",
                        description: "Si tu joue sur la meilleure plateforme"
                    },
                    {
                        label: "Playstation",
                        value: "playstation",
                        description: "Si tu joue sur une plateforme de rlaa"
                    },
                    {
                        label: "Xbox",
                        value: "xbox",
                        description: "C'est une plateforme ou un trou a thune ?"
                    },
                    {
                        label: "Switch",
                        value: "switch",
                        description: "Es-tu un gameur ?"
                    },
                    {
                        label: "Mobile",
                        value: "mobile",
                        description: "Après tout c'est quoi une plateforme ?"
                    }
                ])
            )
        
        message.channel.send({content: "**Plateforme :**", components: [menu]})
    },
    name : 'plateforme'
}
*/