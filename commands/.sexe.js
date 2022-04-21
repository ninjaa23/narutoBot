/*
const Discord = require('discord.js')

module.exports = {
    run : (message) => {
        const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                .setStyle('SECONDARY')
                .setLabel("Homme")
                .setCustomId("homme")
                .setEmoji('♂️')
            ).addComponents(new Discord.MessageButton()
                .setStyle('SECONDARY')
                .setLabel("Femme")
                .setCustomId("femme")
                .setEmoji('♀️')
            )

        message.delete()
        message.channel.send({content: `
**Quel est ton sexe ?**
- Homme
- Femme

**ATTENTION**
**Cette opération est irréversible, une fois le role choisis, vous ne pourrez plus le changer !**`, components: [btn]})
    },
    name : 'sexe'
}
*/