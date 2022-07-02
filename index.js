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
    fs = require('fs'),
    { SlashCommandBuilder } = require("@discordjs/builders")

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

const Clear = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("wuw")
    .addIntegerOption(option => option
        .setName('text')
        .setDescription("wow")
        .setRequired(true));

const Console = new SlashCommandBuilder()
    .setName("console")
    .setDescription("sheesh")
    .addStringOption(option => option
        .setName('text')
        .setDescription("vroum vroum")
        .setRequired(true));

const Modset = new SlashCommandBuilder()
    .setName('modset')
    .setDescription("huh ?")
    .addUserOption(option => option
        .setName('user')
        .setDescription('ouvouvouainvouain')
        .setRequired(true))
    .addIntegerOption(option => option
        .setName('level')
        .setDescription('sheesh')
        .addChoice("le ninja le plus puissant d'ce monde", 1)
        .addChoice("admin", 2)
        .addChoice("modo", 3)
        .addChoice("genin", 0)
        .setRequired(true));

const Pp = new SlashCommandBuilder()
        .setName('pp')
        .setDescription("Affiche la grosse tête d'un ninja.")
        .addUserOption(option => option
            .setName('user')
            .setDescription("@ le ninja dont tu veux voir la big tête.")
            .setRequired(false));

const Warn = new SlashCommandBuilder()
            .setName('warn')
            .setDescription('tfouu')
            .addUserOption(option => option
                .setName('user')
                .setDescription('le connard')
                .setRequired(true))
            .addStringOption(option => option
                .setName('text')
                .setDescription('raisonnarde')
                .setRequired(false))

const Unwarn = new SlashCommandBuilder()
    .setName('unwarn')
    .setDescription('tfouu ehlek')
    .addUserOption(option => option
        .setName('user')
        .setDescription("l'ancien connard")
        .setRequired(true))
    .addIntegerOption(option => option
        .setName('chiffre')
        .setDescription("fphfphfphf")
        .setRequired(true))
    .addStringOption(option => option
        .setName('text')
        .setDescription("raisonnarde de la raisonnarde")
        .setRequired(false))

const UserInfo = new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('gnah')
        .addUserOption(option => option
            .setName('user')
            .setDescription('arha')
            .setRequired(false))
        .addIntegerOption(option => option
            .setName('info')
            .setDescription('wuw')
            .addChoice("warns", 1)
            .setRequired(false))

const Ticket = new SlashCommandBuilder()
            .setName('ticket')
            .setDescription('ok.')
            .addStringOption(option => option
                .setName('titre')
                .setDescription("Le titre de ton ticket")
                .setRequired(true))
            .addIntegerOption(option => option
                .setName('raison')
                .setDescription("La raison de ton ticket")
                .addChoice("Autre",0)
                .addChoice("Signalement",1)
                .addChoice("Question/renseignement",2)
                .addChoice("Bug/problème",3)
                .setRequired(true))
            .addIntegerOption(option => option
                .setName('modos')
                .setDescription("A qui tu veux parler ?")
                .addChoice("Juste ninjaa",0)
                .addChoice("Administrateurs",1)
                .addChoice("Tout le staff",2)
                .setRequired(true))

const Close = new SlashCommandBuilder()
                .setName('close')
                .setDescription('rwarr')
                .addChannelOption(option => option
                    .setName('channel')
                    .setDescription("Le ticket que tu veux supprimer.")
                    .setRequired(false))

const Unclose = new SlashCommandBuilder()
                    .setName('unclose')
                    .setDescription('rwuurr')
                    .addChannelOption(option => option
                        .setName('channel')
                        .setDescription("Le ticket que tu veux remettre.")
                        .setRequired(false))

commandes = [Clear, Console, Modset, Pp, Warn, Unwarn, UserInfo, Ticket, Close, Unclose]

client.on("ready", () => {
    client.guilds.cache.get('835899614678876162').commands.set(commandes)
})

client.on('interactionCreate', interaction => {
    if(!interaction.isCommand()) return;
    const commande = client.commands.get(interaction.commandName)
    const levelBoard = {1: "ninja le plus puissant d'ce monde", 2: "admin", 3: "modo", 0: "genin"}
    if(commande){
        commande.run({client, interaction, levelBoard})
    }
})

// BOUTTONS, MENU
client.on('interactionCreate', interaction => {
    const member = interaction.member,
        rListe = member._roles
    const roles_logs = client.channels.cache.get(config.roles_logs)
    // BOUTONS
    if(interaction.isButton()){
        // règle
        if(interaction.customId === 'regle'){
            const ninja = '835929704351137797',
                captcha = '836162790879657996',
                autre = '843176992001097760'
            const general = client.channels.cache.get('835899615156764734')
            if(member.roles.cache.has(ninja)) return interaction.reply({content: "Tu as déjà accepté le pacte ninja !", ephemeral: true})
            interaction.reply({content: "ah oui et il y a écrit au dos de la feuille que tu n'as plus le droit de quitter le serveur en signant..cheh", ephemeral: true})
            member.roles.add(ninja)
            member.roles.add(autre)
            member.roles.remove(captcha)
            general.send(`Bienvenue ${member} !`)
        }
        // sexe
        if(interaction.customId === 'homme'){
            const homme = '838087607740792892',
                femme = '838088344260313099'

            if(!rListe.includes(homme) && !rListe.includes(femme)){
                member.roles.add(homme)
                roles_logs.send(`<@${member.user.id}> a choisis le **sexe homme**.`)
                interaction.reply({content: "Ton rôle a bien été ajouté ninja.", ephemeral: true})
            }else{
                interaction.reply({content: "Tu as déjà choisis ton sexe ninja..", ephemeral: true})
            }
        }
        if(interaction.customId === 'femme'){
            const homme = '838087607740792892',
                femme = '838088344260313099'

            if(!rListe.includes(homme) && !rListe.includes(femme)){
                member.roles.add(femme)
                roles_logs.send(`<@${member.user.id}> a choisis le **sexe femme**.`)
                interaction.reply({content: "Ton rôle a bien été ajouté ninja.", ephemeral: true})
            }else{
                interaction.reply({content: "Tu as déjà choisis ton sexe ninja..", ephemeral: true})
            }
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

            if(values.includes("ordinateur") && !rListe.includes(ordinateur)){
                member.roles.add(ordinateur)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role **ordinateur**.`)
            }else if(!values.includes("ordinateur") && rListe.includes(ordinateur)){
                member.roles.remove(ordinateur)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role **ordinateur**.`)
            }
            if(values.includes("playstation") && !rListe.includes(playstation)){
                member.roles.add(playstation)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role **playstation**.`)
            }else if(!values.includes("playstation") && rListe.includes(playstation)){
                member.roles.remove(playstation)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role **playstation**.`)
            }
            if(values.includes("xbox") && !rListe.includes(xbox)){
                member.roles.add(xbox)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role **xbox**.`)
            }else if(!values.includes("xbox") && rListe.includes(xbox)){
                member.roles.remove(xbox)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role **xbox**.`)
            }
            if(values.includes("switch") && !rListe.includes(switcH)){
                member.roles.add(switcH)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role **switch**.`)
            }else if(!values.includes("switch") && rListe.includes(switcH)){
                member.roles.remove(switcH)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role **switch**.`)
            }
            if(values.includes("mobile") && !rListe.includes(mobile)){
                member.roles.add(mobile)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role **mobile**.`)
            }else if(!values.includes("mobile") && rListe.includes(mobile)){
                member.roles.remove(mobile)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role **mobile**.`)
            }
            if(values.length === 0){
                member.roles.remove(plateforme)
                roles_logs.send(`<@${member.user.id}> n'a plus de rôles de **plateforme**.`)
            } else member.roles.add(plateforme)

            interaction.reply({content: "Tes roles ont bien été mis à jour ninja !", ephemeral: true})
        }
        // notifications
        if(interaction.customId === 'notification'){
            const notification = '845975894731784192',
                bump = '939983835947491348',
                anti_pub = '845983637815164938',
                actualites = '845982332657336320',
                pubs_modo = '845977518661566464',
                partenariat = '845977023666978856'

            if(values.includes("bump") && !rListe.includes(bump)){
                member.roles.add(bump)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role **bump**.`)
            }else if(!values.includes("bump") && rListe.includes(bump)){
                member.roles.remove(bump)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role **bump**.`)
            }
            if(values.includes("anti_pub") && !rListe.includes(anti_pub)){
                member.roles.add(anti_pub)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role **anti pub**.`)
            }else if(!values.includes("anti_pub") && rListe.includes(anti_pub)){
                member.roles.remove(anti_pub)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role **anti pub**.`)
            }
            if(values.includes("actualites") && !rListe.includes(actualites)){
                member.roles.add(actualites)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role **actualités**.`)
            }else if(!values.includes("actualites") && rListe.includes(actualites)){
                member.roles.remove(actualites)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role **actualités**.`)
            }
            if(values.includes("pubs_modo") && !rListe.includes(pubs_modo)){
                member.roles.add(pubs_modo)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role **pubs modo**.`)
            }else if(!values.includes("pubs_modo") && rListe.includes(pubs_modo)){
                member.roles.remove(pubs_modo)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role **pubs modo**.`)
            }
            if(values.includes("partenariat") && !rListe.includes(partenariat)){
                member.roles.add(partenariat)
                roles_logs.send(`<@${member.user.id}> vient de se **rajouter** le role **partenariat**.`)
            }else if(!values.includes("partenariat") && rListe.includes(partenariat)){
                member.roles.remove(partenariat)
                roles_logs.send(`<@${member.user.id}> vient de se **retirer** le role **partenariat**.`)
            }
            if(values.length === 0){
                member.roles.remove(notification)
                roles_logs.send(`<@${member.user.id}> n'a plus de rôles de notifications.`)
            } else member.roles.add(notification)

            interaction.reply({content: "Tes roles ont bien été mis à jour ninja !", ephemeral: true})
        }
    }
})

// COMMAND LOGS
client.on('message', (message) => {
    if(!message.guild || !message.interaction) return
    const member = message.interaction.user,
        channel = message.channelId,
        name = message.interaction.commandName,
        bot = message.author,
        logs = config.command_logs
    
    message.guild.channels.cache.get(logs).send({embeds: [
        new Discord.MessageEmbed()
        .setAuthor(`[${name}] ${member.username}`, member.displayAvatarURL())
        .addField("bot", `<@${bot.id}>`, false)
        .addField("commande", `${name}`, false)
        .addField("channel", `<#${channel}>`, false)
        .addField("ninja", `<@${member.id}>`, false)
        .setThumbnail(bot.displayAvatarURL())
        .setColor("#000")
        .setTimestamp()
    ]})
})

// BUMP
client.on('message', (message) => {
    if(!message.guild || !message.interaction) return
    if(time === false) return
    if(message.author.id !== '302050872383242240' || message.interaction.commandName !== "bump") return

    const bumpChannel = client.channels.cache.get(config.bump),
        member = message.interaction.user

    if(!client.db.bump[member.id]){
        client.db.bump[member.id] = 1
    }else client.db.bump[member.id] ++
    fs.writeFileSync("./db.json", JSON.stringify(client.db))

    message.channel.send("Merci pour le bump mon reuf ♥️")
    time = false
    setTimeout(function(){
        bumpChannel.send("<@&939983835947491348>, un nouveau bump est disponible !")
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
        if(chiffre <= ninja) return message.reply("Tu ne peux pas mettre un goal égal ou plus petit que notre nombre de ninjas mon reuf.")

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