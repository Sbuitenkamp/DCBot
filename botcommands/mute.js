module.exports = {
    name: 'mute',
    execute(message, muteHandler, reason) {
        if (!message.member.roles.some(r => ['Supreme One', 'ShadBot'].includes(r.name))) {
            muteHandler(message, message.member, true);
            try {
                message.member.send(`You have been muted for ${reason}.`)
            } catch (e) {
                console.log(e);
            }
        } else {
            message.reply('I can\'t mute Shadew.');
        }
    }
};