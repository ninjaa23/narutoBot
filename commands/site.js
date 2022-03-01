module.exports = {
    run : (message) => {
        message.reply("Cette commande est en maintenance désolée ninja..")
    },
    name : 'site'
}
/*
const Discord = require('discord.js')

module.exports = {
    run : message => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("Notre site !")
            .setDescription("N'hesite pas à jeter un coup d'oeuil à notre site ! Dis nous ton avis ca fera plaisir :"+")"+"\n[Clic ou j'te clic](https://choupiikaaa.000webhostapp.com)")
            .setColor('#000'))
    },
    name : 'site',
    help : {
        description : "Affiche le lien du meilleure site du monde."
    }
}
*/