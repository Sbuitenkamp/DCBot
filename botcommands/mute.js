module.exports = {
    name: 'mute',
    execute(message, muteHandler, reason) {
        if (!message.member.roles.some(r => ['Supreme One', 'ShadBot'].includes(r.name))) {
            muteHandler(message, message.member, true);
            message.member.send(`You have been muted for ${reason}.`).catch(e => console.log(`${message.member.displayName} doesn't accept dms...`));
        } else {
            message.reply('I can\'t mute Shadew.');
        }
    }
};