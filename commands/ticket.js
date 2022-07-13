const config = require("../config.json"),
    mysql = require('mysql')

const db = mysql.createConnection({
    host : config.db.host,
    port : config.db.port,
    user : config.db.user,
    password : config.db.pass,
    database : config.db.name
})

module.exports = {
    run : ({interaction}) => {
        const titre = interaction.options.getString('titre'),
            raison = interaction.options.getInteger('raison'), // 0 : Autre, 1 : Signalement, 2 : Question/renseignement, 3 : Bug/problème
            modo = interaction.options.getInteger('modos'),
            member = interaction.user,
            channel = interaction.guild.channels.cache.get(interaction.channelId)

        const sheesh = ['755765421021331497', '835938228455997461', '836168609885716520'],
            sheeshv2 = [".. bah je sais pas enft", " il veut signaler quelqu'un", " il veut vous demander un truc", " il a un problème je crois"],
            sheeshSolo = [".. bah je sais pas enft", " il a un problème avec quelqu'un", " il a une question", " je sais pas il est coincé je crois"]
        
        sheesh.splice(modo + 1, sheesh.length)

        db.query(`SELECT COUNT(*) FROM tickets WHERE authorid = "${member.id}" AND close != true;`,
            async(err, result) => {
                if(err) return console.log(err);
                nbtickets = result[0]["COUNT(*)"]

                if(nbtickets > 2){
                    interaction.reply("Tu as déjà trois tickets d'ouvert ninja.")
                    if(nbtickets > 3){
                        return channel.send("T'en a carrément plus toi en plus !")
                    }else return
                }
                if(titre.length > 100) return interaction.reply(`Le titre de ton ticket ne doit pas dépasser les 100 caractères, il fait ${titre.length} caractères. Tiens pour éviter de tout reécrire ninja : ${titre}`)

                const ticketChannel = await interaction.guild.channels.create(`${titre}`, {
                    type : 'text',
                    parent : config.ticket,
                    permissionOverwrites : [{
                        id : interaction.guild.roles.everyone,
                        deny : ['VIEW_CHANNEL']
                    },
                    {
                        id : member.id,
                        allow : ['CREATE_INSTANT_INVITE', 'ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS', 'USE_APPLICATION_COMMANDS', 'USE_EXTERNAL_STICKERS']
                    },...sheesh.map(id => ({
                        id,
                        allow : ['CREATE_INSTANT_INVITE', 'ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS', 'USE_APPLICATION_COMMANDS', 'USE_EXTERNAL_STICKERS']
                    }))]
                })
                if(modo === 0){
                    ticketChannel.send(`Yo les reufs, ticket de ${member} car${sheeshSolo[raison]}`)
                }else{
                    ticketChannel.send(`Salut frero, ${member} il veut te parler car${sheeshv2[raison]}`)
                }

                db.query(`INSERT INTO tickets (titre, raison, staff, date, authorid, channelid, pseudo, close) VALUES ("${titre}", ${raison}, ${modo}, '${Date.now()}', '${member.id}', '${ticketChannel.id}', "${encodeURIComponent(member.username)}", false);`)
                
                return interaction.reply("C'est bon 👍🏿")
            })
    },
    name : 'ticket'
}