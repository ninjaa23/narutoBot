const Discord = require('discord.js')

module.exports = {
    run : (message, client) => {
        const menu = new Discord.MessageActionRow().addComponents(
            new Discord.MessageSelectMenu()
                .setCustomId("platformes")
                .setPlaceholder("Choisis tes platformes !")
                .addOptions([
                    {
                        label: "Ordinateur",
                        value: "ordinateur",
                        description: "Si tu joue sur la meilleure platforme"
                    },
                    {
                        label: "Playstation",
                        value: "playstation",
                        description: "Si tu joue sur une platforme de rlaa"
                    },
                    {
                        label: "Xbox",
                        value: "xbox",
                        description: "C'est une platforme ou un trou a thune ?"
                    },
                    {
                        label: "Switch",
                        value: "switch",
                        description: "Es-tu un gameur ?"
                    },
                    {
                        label: "Mobile",
                        value: "mobile",
                        description: "Après tout c'est quoi une platforme ?"
                    }
                ])
            )
    },
    name : 'test'
}