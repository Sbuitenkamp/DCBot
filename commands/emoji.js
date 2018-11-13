module.exports = {
    name: 'emoji',
    description: 'get an emoji (useful if you dont have nitro but still want to use animated emojis)',
    syntax: 'emoji <server emojiname>',
    type: 'normal',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message, permitted, notPermitted, args) {
        let emote = message.guild.emojis.find(e => e.name.toLowerCase() === args[0]);
        if (emote !== null && emote !== '') {
            message.channel.send(emote.toString());
            message.delete();
        } else {
            message.channel.send(`Emoji not found`);
        }
    }
};