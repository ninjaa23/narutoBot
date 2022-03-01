/*
const Discord = require('discord.js')

module.exports = {
    run : (message, client) => {
        const menu = new Discord.MessageActionRow().addComponents(
            new Discord.MessageSelectMenu()
                .setCustomId("notification")
                .setPlaceholder("Choisis tes notifications !")
                .setMinValues(0)
                .setMaxValues(5)
                .addOptions([
                    {
                        label: "Bump",
                        value: "bump",
                        description: "Pour les plus valeureux qui sont prêt à être ping toutes les 2h !"
                    },
                    {
                        label: "Anti pubs",
                        value: "anti_pub",
                        description: "Pour ceux qui aiment bien voir la face cachée des serveurs.."
                    },
                    {
                        label: "Actualités",
                        value: "actualites",
                        description: "Toutes les actus du serveurs, nouveautés, features, etc.."
                    },
                    {
                        label: "Pubs modo",
                        value: "pubs_modo",
                        description: "Toutes les pubs du staff"
                    },
                    {
                        label: "Partenariats",
                        value: "partenariat",
                        description: "Les partenariats"
                    }
                ])
            )
        
        message.channel.send({content: "**Notification :**", components: [menu]})
    },
    name : 'notif'
}
*/