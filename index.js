const config = require("./config.js")
const language = require("./language.js")
const Eris = require("eris");

var bot = new Eris(config.botToken);
bot.on("ready", () => {
    console.log("Ready");
    bot.createMessage(config.logChannel, ":electric_plug: [Ready]")
});

bot.on("messageCreate", (msg) => {
    // Check if user is a bot, or if it is the current user
    // Checking both in-case someone uses a userbot
    if (msg.member.id === bot.user.id || msg.member.bot) {
        return
    }
    // Check if user is immune
    if (msg.member.roles.includes(config.immuneRole) || config.immuneUsers.includes(msg.member.id)) {
        return 
    }
    // Filter to affected channels
    if (!config.affectedChannels.includes(msg.channel.id)) { 
        return
    }
    // Check if message contains YouTube url
    if (!msg.content.match(config.urlRegex)) {
        failedMessage("link", msg)
        return
    }
    // Check if message contains a valid timestamp
    if (!msg.content.match(config.timestampRegex)) {
        failedMessage("timestamp", msg)
        return
    }

    // All tests passed. Do no action

});

function failedMessage (reason, msg) {
    msg.delete(`suggestionsBot: Failed ${reason} check`)
    bot.createMessage(config.logChannel, `:speech_balloon: [Failed ${reason}] <@${msg.member.id}> tried to say \`${msg.cleanContent}\` in <#${msg.channel.id}>`)
    
    let reasonString = ""
    switch (reason) {
        case "link": 
            reasonString = language.userErrors.failedLink
            break
        case "timestamp":
            reasonString = language.userErrors.failedTimestamp
            break;
    }

    let tipString = ""
    if (language.tips.length > 0) {
        let tipSelector = Math.floor(Math.random()*language.tips.length)
        tipString = language.tips[tipSelector]
    }

    timedDelete(bot.createMessage(msg.channel.id, {
        embed: {
            title: language.title,
            description: reasonString,
            footer: { text: tipString }
        }
    }))
}

async function timedDelete(msg) {
    let awaitedMsg = await msg
    setTimeout(() => {
        awaitedMsg.delete()
    }, config.deleteTimer)
}

bot.connect(); // Get the bot to connect to Discord