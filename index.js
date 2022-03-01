const Discord = require('discord.js'),
    client = new Discord.Client({
        intents: [
            Discord.Intents.FLAGS.GUILDS,
            Discord.Intents.FLAGS.GUILD_MEMBERS,
            Discord.Intents.FLAGS.GUILD_BANS,
            Discord.Intents.FLAGS.GUILD_VOICE_STATES,
            Discord.Intents.FLAGS.GUILD_MESSAGES,
            Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Discord.Intents.FLAGS.DIRECT_MESSAGES,
        ],
        fetshAllMembers : true,
        partials : ['MESSAGE', 'REACTION', 'CHANNEL']
    }),
config = require('./config.json'),
fs = require('fs')

client.login(config.token)
client.commands = new Discord.Collection()
client.db = require('./db.json')

// REVEILLE
let time
let dm = 0
client.on('ready', () => {
    console.log("Je suis réveillé !")
    const guild = client.guilds.cache.find(g => g.id === '835899614678876162')
    guild.members.fetch().then(member => {
        wow = member.find(user => user.id === '755765421021331497')
        dm = 1
        wow.send("je suis réveillé mon reuf")
    })
})

fs.readdir('./commands', (err, files) => {
    if(err) throw err
    files.forEach(file => {
        if(!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})

// COMMANDE HANDLER
client.on('message', message => {
    if(!message.guild) return
    if(message.type !== 'DEFAULT' || message.author.bot) return

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift()
    const commandNameM = commandName.toLowerCase()
    if(!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    const commandM = client.commands.get(commandNameM.slice(config.prefix.length))
    if(command) {
        command.run(message, args, client)
    }else{
        if(commandM){
            commandM.run(message, args, client)
        }else {
            const wuw = message.content.trim().split(/ +/g).shift().slice(config.prefix.length)
            if(wuw == "secretmp" || "setgoal" || "nextgoal"){
                return
            }else {
                message.channel.send("Cette commande n'existe pas, tu peux faire n*help pour en savoir plus !")
            }
        }
    }
})

// BOUTTONS, MENU
client.on('interactionCreate', interaction => {
    const member = interaction.member
    const roles_logs = client.channels.cache.get(config.roles_logs)
    // BOUTONS
    if(interaction.isButton()){
        // règle
        if(interaction.customId === 'regle'){
            const ninja = '835929704351137797',
                gender = '838086395066974239',
                captcha = '836162790879657996',
                autre = '843176992001097760'
            const general = client.channels.cache.get('835899615156764734')
            if(member.roles.cache.has(ninja)) return interaction.reply({content: "Tu as déjà accepté le pacte ninja !", ephemeral: true})
            interaction.reply({content: "ah oui et il y a écrit au dos de la feuille que tu n'as plus le droit de quitter le serveur en signant..cheh", ephemeral: true})
            member.roles.add(ninja)
            member.roles.add(gender)
            member.roles.add(autre)
            member.roles.remove(captcha)
            general.send(`Bienvenue ${member} !`)
        }
        // genre
        if(interaction.customId === 'homme'){
            const gender = '838086395066974239',
                homme = '838087607740792892'
            member.roles.remove(gender)
            member.roles.add(homme)
            roles_logs.send(`<@${member.user.id}> a choisis le **genre** <@&${homme}>.`)
            interaction.reply({content: "Ton rôle a bien été ajouté ninja.", ephemeral: true})
        }
        if(interaction.customId === 'femme'){
            const gender = '838086395066974239',
                femme = '838088344260313099'
            member.roles.remove(gender)
            member.roles.add(femme)
            roles_logs.send(`<@${member.user.id}> a choisis le **genre** <@&${femme}>.`)
            interaction.reply({content: "Ton rôle a bien été ajouté ninja.", ephemeral: true})
        }
        if(interaction.customId === 'autre'){
            const gender = '838086395066974239',
                autre = '931606629353394286'
            member.roles.remove(gender)
            member.roles.add(autre)
            roles_logs.send(`<@${member.user.id}> a choisis le **genre** <@&${autre}>.`)
            interaction.reply({content: "Ton rôle a bien été ajouté ninja.", ephemeral: true})
        }
    }
    // MENU
    if(interaction.isSelectMenu){
        const values = interaction.values
        // plateformes
        if(interaction.customId === 'plateforme'){
            const plateforme = '843174149950144512',
                ordinateur = '836322672043884654',
                playstation = '836322089345613864',
                xbox = '836322593426374717',
                switcH = '836322341381865524',
                mobile = '836322375440138291'

            if(values.includes("ordinateur")){
                member.roles.add(ordinateur)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role <@&${ordinateur}>.`)
            }else{
                member.roles.remove(ordinateur)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role <@&${ordinateur}>.`)
            }
            if(values.includes("playstation")){
                member.roles.add(playstation)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role <@&${playstation}>.`)
            }else{
                member.roles.remove(playstation)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role <@&${playstation}>.`)
            }
            if(values.includes("xbox")){
                member.roles.add(xbox)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role <@&${xbox}>.`)
            }else{
                member.roles.remove(xbox)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role <@&${xbox}>.`)
            }
            if(values.includes("switch")){
                member.roles.add(switcH)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role <@&${switcH}>.`)
            }else{
                member.roles.remove(switcH)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role <@&${switcH}>.`)
            }
            if(values.includes("mobile")){
                member.roles.add(mobile)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role <@&${mobile}>.`)
            }else{
                member.roles.remove(mobile)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role <@&${mobile}>.`)
            }
            if(values.length === 0){
                member.roles.remove(plateforme)
                roles_logs.send(`<@${member.user.id}> n'a plus de rôles dans <@&${plateforme}>.`)
            } else member.roles.add(plateforme)

            interaction.reply({content: "Tes roles ont bien été mis à jour !", ephemeral: true})
        }
        // notifications
        if(interaction.customId === 'notification'){
            const notification = '845975894731784192',
                bump = '939983835947491348',
                anti_pub = '845983637815164938',
                actualites = '845982332657336320',
                pubs_modo = '845977518661566464',
                partenariat = '845977023666978856'

            if(values.includes("bump")){
                member.roles.add(bump)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role <@&${bump}>.`)
            }else{
                member.roles.remove(bump)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role <@&${bump}>.`)
            }
            if(values.includes("anti_pub")){
                member.roles.add(anti_pub)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role <@&${anti_pub}>.`)
            }else{
                member.roles.remove(anti_pub)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role <@&${anti_pub}>.`)
            }
            if(values.includes("actualites")){
                member.roles.add(actualites)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role <@&${actualites}>.`)
            }else{
                member.roles.remove(actualites)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role <@&${actualites}>.`)
            }
            if(values.includes("pubs_modo")){
                member.roles.add(pubs_modo)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role <@&${pubs_modo}>.`)
            }else{
                member.roles.remove(pubs_modo)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role <@&${pubs_modo}>.`)
            }
            if(values.includes("partenariat")){
                member.roles.add(partenariat)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role <@&${partenariat}>.`)
            }else{
                member.roles.remove(partenariat)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role <@&${partenariat}>.`)
            }
            if(values.length === 0){
                member.roles.remove(notification)
                roles_logs.send(`<@${member.user.id}> n'a plus de rôles dans <@&${notification}>.`)
            } else member.roles.add(notification)
            interaction.reply({content: "Tes roles ont bien été mis à jour !", ephemeral: true})
        }
    }
})

// BUMP
client.on('message', (message, member /* c'est pour plus tard le member mais tqt */) => {
    if(message.type !== 'DEFAULT' || message.author.bot || !message.guild) return
    if(time === false) return
    const bump = client.channels.cache.get(config.bump)
    const mess = message.content.toLocaleLowerCase()
    if(mess !== "!d bump") return
    if(message.channel.id !== bump.id) return
    message.reply("Merci pour le bump mon reuf ♥️")
    time = false
    setTimeout(function(){
        bump.send("<@&939983835947491348>, un nouveau bump est disponible !")
        time = true
    },7200000 /* =2h */)
})

// GOAL
client.on('message', (message) => {
    if(message.type !== 'DEFAULT' || message.author.bot || !message.guild) return
    const args = message.content.trim().split(/ +/g)
    if(!args[0].startsWith(config.prefix)) return
    let command = args[0].slice(config.prefix.length)
    command = command.toLowerCase()

    if(command !== "setgoal") return
    const guild = client.guilds.cache.find(g => g.id === '835899614678876162')
    client.db = require('./db.json')
    if(!client.db.hierarchie.user[message.author.id] ) return message.reply("Tu n'es que genin, tu ne peux pas prendre ce genre de décisions.")
    const authLevel = client.db.hierarchie.user[message.author.id].level
    if(authLevel > 2) return message.reply("Les modérateurs ne sont pas autorisés à changer le goal, désolée ninja mais tu vas devoir continuer à t'entrainer.")

    if(!args[1]) return message.reply("Tu ne m'as pas dis à combien je dois mettre le goal ninja.")
    let chiffre = message.content.slice(command.length + config.prefix.length + 1)
    chiffre = chiffre.replace(/ /g,'')
    if(isNaN(chiffre) === true) return message.reply("Tu ne peux que mettre un nombre au goal hmall")
    
    guild.members.fetch().then(member => {
        let ninja = member.filter(m => m.roles.cache.has('835929704351137797')).size
        if(chiffre <= ninja) return message.reply("Tu ne peux pas mettre un goal plus égal ou plus petit que notre nombre de ninjas mon reuf.")

        console.log(chiffre)
        client.channels.cache.get(config.serverStats.goal).setName(`🏆 Goal : ${chiffre}`)
        message.channel.send("Goal bien mis à jour !")
    })
})

// STATUS
client.on('ready', () => {
    let i = 0
    setInterval(() => {
        const guild = client.guilds.cache.find(g => g.id === '835899614678876162')

        guild.members.fetch().then(member => {
            let ninja = member.filter(m => m.roles.cache.has('835929704351137797')).size
            let garde = member.filter(m => m.roles.cache.has('835930903972806697')).size

        const statuses = [
            () => 'Concentrer son chakra !',
            () => 'Attendre n*help',
            () => 'Malaxer son fuiton',
            () => `Gérer ${ninja} ninjas !`,
            () => `Discuter avec ${garde - 1} autres gardes !`,
            () => 'Manger des ramens..',
            () => 'Chercher Sasuke ce hmall...',
            () => 'Entrainer Konohamaru'
        ]
        client.user.setActivity(statuses[i](), {type : 'PLAYING'})
        i = ++i % statuses.length
        })
    }, 1e4)
    // stats
    setInterval(() => {
        const guild = client.guilds.cache.find(g => g.id === '835899614678876162')
        guild.members.fetch().then(member => {
            let ninja = member.filter(m => m.roles.cache.has('835929704351137797')).size
            let garde = member.filter(m => m.roles.cache.has('835930903972806697')).size
            
            client.channels.cache.get(config.serverStats.ninjas).setName(`🤺Ninjas : ${ninja}`)
            client.channels.cache.get(config.serverStats.gardes).setName(`🤖Gardes : ${garde}`)
        })
    }, 3e4)
})

// BIENVENUE
client.on('guildMemberAdd', member => {
    const wowB = client.channels.cache.get('837699333489950821')
    wowB.send(`**${member} est arrivé au village ! Tu peux passer le captcha et accepter les règles afin d'être promus ninja.**`)
})

client.on('guildMemberRemove', member => {
    const wowB = client.channels.cache.get('837699333489950821')
    wowB.send(`**Adieu ${member.user.tag}, sale déserteur !**`)
})

// KSOS
client.on('message', (message) => {
    if(message.author.id === '837454370537996318') return
    let contentM = message.content.toLocaleLowerCase().replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"")
    contentM = contentM.replace(/ /g, "")
    let taille = contentM.length

    // quoi
    for(let i = 1; i < taille; i++){
        if(contentM[taille - i] === 'i'){
            contentM = contentM.replace(/.$/, '');
        }
    }

    contentM += 'i'
    if(contentM.endsWith('quoi')){
        message.reply('feur')
    }
    contentM = contentM.replace(/.$/, '')

    // 1, 2, 3, soleil
    for(let i = 1; i < taille; i++){
        if(contentM[taille - i] === 'n'){
            contentM = contentM.replace(/.$/, '');
        }
    }

    contentM += 'n'
    if(contentM.endsWith("hein")){
        message.reply("2")
    }
    contentM = contentM.replace(/.$/, '')
    if(contentM === "1"){
        message.reply("2")
    }
    if(contentM === "2"){
        message.reply("3")
    }
    if(contentM === "3"){
        message.reply("soleil")
    }
})

// SELF PING
client.on('message', message => {
    if(!message.guild) return
    if(!message.mentions.members.first()) return

    const zakaria = message.mentions.members.first()
    const contenu = message.content.toLowerCase()
    if(zakaria.id !== '837454370537996318') return

        if((contenu.indexOf("test") > 0)||(contenu.indexOf("ntm") > 0)||(contenu.indexOf("creve") > 0)){
            message.reply("ta mere")
        }else{
            message.channel.send('¿')
        }
        if(contenu.split(' ')[1] === 'bonjour'){
            message.reply("Yo")
        }
})

// DM
client.on('message', message => {
    if(message.guild) return

    const author = message.author.tag
    const content = message.content
    const solitude = client.channels.cache.get(config.solitude)
    if(dm === 0){
solitude.send(`
**${author}**
${content}`)
    }else dm = 0
})

client.on("message", message => {
    if(message.type !== 'DEFAULT' || message.author.bot) return
    const args = message.content.trim().split(/ +/g),
        commandA = args.shift().toLowerCase()
    if(!commandA.startsWith(config.prefix)) return
    const command = commandA.slice(config.prefix.length)

    if(command == "secretmp"){
        const guild = client.guilds.cache.find(g => g.id === '835899614678876162')
        const id = args[0]
        let tssoua = 0
        const text = args.slice(1).join(' ')

        if(!client.db.hierarchie.user[message.author.id]) return message.reply("Tu n'es que genin, je ne peux pas mp des personnes pour toi malheuresement.")
        if(!id) return message.channel.send("Tu ne m'as pas donné l'id du ninja que je dois mp.")
        if(!text) return message.channel.send("Tu ne m'as pas dis le message à envoyer ninja.")

        guild.members.cache.forEach(async(member) => {
            if(member.id !== id) return
            try{
                tssoua = 1
                await member.send(text)
                await message.channel.send("Message bien envoyé !")
            } catch (err) {
                await message.reply("J'ai rencontré une erreur, cette personne ne peut peut-être pas recevoir de messages d'inconnues.")
            }
        })
        if(tssoua === 0) return message.reply("Il n'y a aucun membre disposant de cette id ninja.")
    }
})