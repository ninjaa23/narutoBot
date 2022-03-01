module.exports = {
    run : async(message, client) => {
        client.db = require('../db.json')
        const args = message.content.trim().split(/ +/g)
        const text = args.slice(1).join(' ')

        if(!client.db.hierarchie.user[message.author.id]) return message.channel.send("Tu n'es pas assez puissant pour utiliser cette commande ninja.")
        const authLevel = client.db.hierarchie.user[message.author.id].level

        if(authLevel > 1) return message.channel.send("Désolée mon reuf mais cette commande est réservée à mouta")
        if(!text) return message.channel.send("chef tu ne m'as pas dis quoi envoyé..")
        console.log(`${message.author.username} (${message.author.id}) : ${text}`)
        message.channel.send("log bien envoyé !")
    },
    name : 'console'
}