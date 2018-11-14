module.exports = {
    name: 'warn',
    description: 'warns user',
    syntax: 'warn <@user>',
    type: 'admin',
    subtype: 'db',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    async execute(message, permitted, notPermitted, person, warnings, ignore, warnHandler) {
        if (permitted) {
            if (person === null) {
                if (message.mentions.members !== undefined) {
                    person = message.mentions.members.first();
                } else {
                    message.channel.send('I don\'t know that person');
                }
            }
            return warnHandler(person);
        } else {
            message.channel.send(notPermitted);
        }
    }
};