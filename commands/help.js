module.exports = {
    name: 'help',
    description: 'show all commands',
    syntax: 'help',
    type: 'help',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message, commands) {
        message.channel.send(commands);
    }
};