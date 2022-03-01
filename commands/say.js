const config = require("../config.json")

module.exports = {
    run : (message, args) => {
        if(!args[0]) return message.channel.send("Je dois dire quoi hmall ?")
        message.delete()
        message.channel.send(message.content.trim().slice(`${config.prefix}say`.length))
    },
    name : "say"
}