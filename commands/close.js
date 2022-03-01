const fs = require('fs')

module.exports = {
    run : async(message, client) => {
        const channel = message.mentions.channels.first() || message.channel
        if(!client.db.tickets[channel.id]) return message.channel.send("Le salon n'est pas un ticket...")
        if(!message.member.hasPermission('MANAGE_MESSAGES') && client.db.tickets[channel.id].author !== message.author.id) return message.channel.send("T'es pas assez puissant pour le faire désolée ninja.. retourne t'entrainer !")
        delete client.db.tickets[channel.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        await channel.delete()
        message.channel.send(`Le ticket ${channel.name} a été correctement détruit par mon rasengan !`)
    },
    name : 'close',
    help : {
        description : "Ferme un ticket.",
        sytax : "<#ticket> ou envoyer dans le ticket"
    }
}