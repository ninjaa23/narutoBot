module.exports = {
    run : ({client, interaction}) => {
        client.db = require('../db.json')
        const text = interaction.options.getString('text')

        if(!client.db.hierarchie.user[interaction.user.id]) return interaction.reply("Tu n'es pas assez puissant pour effectuer cette commande ninja, retourne t'entrainer !")
        const authLevel = client.db.hierarchie.user[interaction.user.id].level

        if(authLevel > 1) return interaction.reply("Désolée mon reuf mais cette commande est réservée à mouta")
        console.log(`${interaction.user.username} (${interaction.user.id}) : ${text}`)
        interaction.reply("log bien envoyé !")
    },
    name : 'console'
}