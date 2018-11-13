module.exports = {
    name: 'syntaxes',
    description: 'show all commands',
    syntax: 'syntaxes',
    type: 'syntax',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message, syntaxes) {
        message.channel.send(syntaxes);
    }
};