module.exports = {
    name: 'unmute',
    description: 'Removes mute role and returns old roles',
    syntax: 'unmute <@membername>',
    type: 'admin',
    subtype: 'mute',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message, ignore, permitted, notPermitted, muteHandler, unMuter) {
        if (permitted) {
            if (message.mentions.members.first() !== undefined) {
                const person = message.mentions.members.first();
                if (person.roles.array().length === 2 && person.roles.find(role => role.name === 'Shitposted in the wrong neighbourhood')) {
                    muteHandler(message, person, false);
                    unMuter(message, person, 0, true, false);
                } else {
                    message.channel.send('This person isn\'t muted.');
                }
            } else {
                message.channel.send('Please specify a person.');
            }
        } else {
            message.channel.send(notPermitted);
        }
    }
};