const fs = require('fs')

module.exports = {
    run : (message, client) => {
        const mod = message.mentions.members.first()
        client.db = require('../db.json')

        if(!mod){
            if(!client.db.hierarchie.user[message.author.id]) return message.channel.send("Tu es un genin ! Continues à t'entrainer et t'améliorer ninja !")
            const authLevel = client.db.hierarchie.user[message.author.id].level
            message.channel.send(`Tu es grade ${authLevel} !`)
        }
        if(mod){
            if(!client.db.hierarchie.user[mod.id]) return message.channel.send(`Le ninja ${mod} est un genin.`)
            const modLevel = client.db.hierarchie.user[mod.id].level
            message.channel.send(`Le ninja ${mod} est grade ${modLevel}.`)
        }
    },
    name : 'modinfo'
}