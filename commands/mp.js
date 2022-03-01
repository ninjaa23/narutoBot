module.exports = {
    run : async(message, client) => {
        const args = message.content.trim().split(/ +/g)
        client.db = require('../db.json')
        const member = message.mentions.members.first()
        const text = args.slice(2).join(' ')

        if(!client.db.hierarchie.user[message.author.id]) return message.reply("Tu n'es que genin, je ne peux pas mp des personnes pour toi malheuresement.")
        if(!member) return message.channel.send("Tu ne m'as pas mentionné qui je dois mp ninja.")
        if(!text) return message.channel.send("Tu ne m'as pas dis le message à envoyer ninja.")


        try{
            await member.send(text)
            await message.channel.send("Message bien envoyé !")
        } catch (err) {
            await message.reply("J'ai rencontré une erreur, cette personne ne peut peut-être pas recevoir de messages d'inconnues.")
        }
    },
    name : 'mp'
}