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
        const member = interaction.user,
            channelid = interaction.options.getChannel('channel') ? interaction.options.getChannel('channel').id : interaction.channelId
        
        db.query(`SELECT titre,close FROM tickets WHERE channelid = "${channelid}";`,
            (err, result) => {
                if(err) return console.log(err);
                
                if(result.length === 0) return interaction.reply("Ce channel n'est pas un ticket ninja.")

                const close = result[0]["close"]
                
                const channel = interaction.guild.channels.cache.get(channelid),
                    interactionChannel = interaction.guild.channels.cache.get(interaction.channelId)
                
                if(!close){
                    interaction.reply("nice")
                    setTimeout(function() {
                        channel.setParent(config.ticketlogs)
                        db.query(`UPDATE tickets SET close = true WHERE channelid = ${channelid}`)

                        channel.send(`Ticket close par ${member}`)
                    }, 2000)
                }else{
                    db.query(`DELETE FROM tickets WHERE channelid = ${channelid}`)
                    interaction.reply("c'est bon")
                    setTimeout(function() {
                        interactionChannel.send("je mange le ticket dans 2 secs mon reuf")
                    }, 1000)
                    setTimeout(function() {
                        return channel.delete()
                    }, 3000)
                }
            })
    },
    name : 'close'
}