module.exports = {
  run : (message, client) => {
    client.db = require('../db.json')

    if(!client.db.hierarchie.user[message.author.id]) return message.channel.send("T'es pas assez puissant pour le faire désolée ninja.. retourne t'entrainer !")
    const authLevel = client.db.hierarchie.user[message.author.id].level

    if(authLevel > 2) return message.channel.send("Cette commande est réservée aux administrateurs désolée.")
    alphabet(0,message.channel)
  },
  name : "alphabet"
}

function alphabet(i,channel){
  const alphabetList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  if(i !== 26){
    setTimeout(() => {
      channel.send(alphabetList[i]);
      alphabet(i+1,channel);
    },1290);
  }
}