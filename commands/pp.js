module.exports = {
    run : ({interaction}) => {
        const user = interaction.options.getUser('user')
        if(user){
            interaction.reply(user.displayAvatarURL({ size: 2048, format:'png' }))
        }else{
            interaction.reply(interaction.user.displayAvatarURL({ size: 2048, format:'png' }))
        }
    },
    name : 'pp',
    help : {
        description : "Affiche la grosse tête d'un ninja",
        syntax : "<@LeNinja>"
    }
}