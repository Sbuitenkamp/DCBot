module.exports = {
    name: 'clear',
    description: 'clears certain amount of messages (min: 2, max: 100)',
    syntax: 'clear <amount between 2 and 100>',
    type: 'admin',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message, permitted, notPermitted, args) {
        if (permitted) {
            message.channel.bulkDelete(args[0]).then(message.channel.send(`Deleted ${args[0]} messages.`));
        } else {
            message.channel.send(notPermitted);
        }
    }
};