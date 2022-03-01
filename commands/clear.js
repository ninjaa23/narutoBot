module.exports = {
    run : async (message, args, client) => {
        client.db = require('../db.json')
        if(!client.db.hierarchie.user[message.author.id]) return message.channel.send("Tu n'es que genin, tu ne peux pas utiliser cette commande ninja !")
        const authLevel = client.db.hierarchie.user[message.author.id].level

        if(authLevel > 3) return message.channel.send("T'es pas assez puissant pour utiliser cette commande ninja. Retourne t'entrainer ou j'te bute")
        const count = args[0]
        if(!/\d+/.test(count)) return message.channel.send("Je dois supprimer combien de messages hmall ?")
        if(count < 1) return message.channel.send("Tu crois que c'est du respect ça mon garçon, hein ?")
        if(count > 99) return message.channel.send("J'ai n'ai qu'assez de chakra pour en supprimer 99, désolée ninja.")
        const {size} = await message.channel.bulkDelete(Number(count) + 1, true)
        message.channel.send(`${size - 1} messages ont correctement été détruit par mon rasengan !`).then(sent =>
        setTimeout(function(){
            sent.delete()
        },3000 /* =3s */))
    },
    name : 'clear',
    help : {
        description : "Détruit des messages pour toi car j'aime les rasengans.",
        syntax : "<nombre de messages à supprimer (max=99)>"
    }
}