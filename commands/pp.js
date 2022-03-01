module.exports = {
    run : (message) => {
        const wuw = message.mentions.members.first()
        if(wuw){
            message.channel.send(wuw.user.displayAvatarURL({ size: 2048 }))
        }else{message.channel.send(message.author.displayAvatarURL({ size: 2048 }))}
    },
    name : 'pp',
    help : {
        description : "Affiche la grosse tête d'un ninja",
        syntax : "<@LeNinja>"
    }
}