module.exports = {
    run : (message) => {
        message.reply("Cette commande est en maintenance désolée ninja..")
    },
    name : 'help'
}
/*
const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run : (message, args, client) => {
        if(args[0]){
            const commandM = client.commands.get(args[0].toLowerCase()),
                command = client.commands.get(args[0])
            if(!(commandM && command) || !command.help) return message.channel.send("Cette commande n'existe pas..")
            message.channel.send(new Discord.MessageEmbed()
                .setDescription(`**Commande : ${command.name}**\n\n${command.help.description}\n\nSyntaxe : \`${config.prefix}${command.name}${command.help.syntax ? ` ${command.help.syntax}` : ''}\``))
        }else{
            message.channel.send(new Discord.MessageEmbed()
                .setTitle("Toutes les commandes")
                .setDescription(`${client.commands.filter(command => command.help).map(command => `**\`${config.prefix}${command.name}\`**`).join(' ')}\n\nPour plus d'informations sur une commande, envoyez **\`${config.prefix}\`help [nom de la commande]** ou envoyez **love au 777**`))
        }
    },
    name : 'help',
    help : {
        description : "Te fous pas de moi non plus..",
        syntax : '[nom de la commande]'
    }
}
*/