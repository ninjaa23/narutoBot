module.exports = {
    run : async ({client, interaction}) => {
        if(!client.db.hierarchie[interaction.user.id]) return interaction.reply("Tu n'es pas assez puissant pour effectuer cette commande ninja, retourne t'entrainer !")
        const levelAuthor = client.db.hierarchie[interaction.user.id],
            count = interaction.options.getInteger('text')
        
        const levelBoard = {1: "ninja le plus puissant d'ce monde", 2: "admin", 3: "modo", 0: "genin"}

        if(count < 1) return interaction.reply("Tu crois que c'est du respect ça mon garçon, hein ?")
        if(levelAuthor > 2) return interaction.reply(`Désolée ninja mais cette commande n'est pas réservé pour toi, tu es grade ${levelAuthor} (${levelBoard[levelAuthor]})`)
        if(count > 100) return interaction.reply("J'ai n'ai qu'assez de chakra pour en supprimer 100, désolée ninja.")

        const {size} = await interaction.channel.bulkDelete(Number(count), true)
        
        if(size === 1){
            return interaction.reply(`Pff utiliser mon rasengan pour seulement ${size} message... espèce de feignant`)
        }else if(size <= 3){
            return interaction.reply(`Pff utiliser mon rasengan pour seulement ${size} messages... espèce de feignant`)
        }else return interaction.reply(`${size} messages ont correctement été détruits par mon rasengan !`)
    },
    name : 'clear'
}