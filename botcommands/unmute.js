module.exports = {
    name: 'unmute',
    execute(message, muteHandler) {
        muteHandler(message, message.member, false);
        message.member.send(`You have been unmuted.`).catch(e => console.log(`${message.member.displayName} doesn't accept dms`));
    }
};