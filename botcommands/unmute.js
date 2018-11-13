module.exports = {
    name: 'unmute',
    execute(message, muteHandler) {
        muteHandler(message, message.member, false);
        try {
            message.member.send(`You have been unmuted.`)
        } catch (e) {
            console.log(e);
        }
    }
};