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
    run : ({client, interaction}) => {
        const channelid = interaction.options.getChannel('channel') ? interaction.options.getChannel('channel').id : interaction.channelId

        db.query(`SELECT staff, authorid, close FROM tickets WHERE channelid = ${channelid};`,
            (err, result) => {
                if(err) return console.log(err);
                if(result.length === 0) return interaction.reply("Ce channel n'est pas un ticket ninja.")

                const close = result[0]["close"],
                    authorid = result[0]["authorid"],
                    staff = result[0]["staff"]

                const channel = interaction.guild.channels.cache.get(channelid),
                    author = interaction.guild.members.cache.get(authorid),
                    sheesh = ['755765421021331497', '835938228455997461', '836168609885716520']

                sheesh.splice(staff + 1, sheesh.length)

                if(!close) return interaction.reply("Ce ticket n'est pas close ninja.")

                if(interaction.channelId == channelid) interaction.reply("ok mon reuf")

                channel.setParent(config.ticket)
                db.query(`UPDATE tickets SET close = false WHERE channelid = ${channelid}`)
                channel.permissionOverwrites.set([
                    {
                        id : author,
                        allow : ['CREATE_INSTANT_INVITE', 'ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS', 'USE_APPLICATION_COMMANDS', 'USE_EXTERNAL_STICKERS']
                    },...sheesh.map(id => ({
                        id,
                        allow : ['CREATE_INSTANT_INVITE', 'ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS', 'USE_APPLICATION_COMMANDS', 'USE_EXTERNAL_STICKERS']
                }))])

                setTimeout(function() {
                    channel.send("Ce ticket a été unclose je sais pas pourquoi me soulez pas demandez à ninjaa")
                }, 1000)

                if(interaction.channelId != channelid) return interaction.reply("c'est bon frero")
            })
    },
    name : 'unclose'
}