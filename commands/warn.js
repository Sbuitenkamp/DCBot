module.exports = {
    name: 'warn',
    description: 'warns user',
    syntax: 'warn <@user>',
    type: 'admin',
    subtype: 'db',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    async execute(message, permitted, notPermitted, person, warnings, ignore, muteHandler) {
        if (permitted) {
            if (person === null) {
                if (message.mentions.members !== undefined) {
                    person = message.mentions.members.first();
                } else {
                    message.channel.send('I don\'t know that person');
                }
            }
            try {
                const warning = await warnings.findOne({where: {id: person.id}});
                if (warning) {
                    warning.increment('warned');
                    if (warning.get('warned') >= 4) {
                        muteHandler(message, person, true);
                        try {
                            person.send(`You have been muted for getting too many warnings`);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                } else {
                    const makeWarning = await warnings.create({
                        id: person.id,
                    });
                }
                return console.log(`${person} has been warned.`);
            } catch (e) {
                console.log(e);
            }
        } else {
            message.channel.send(notPermitted);
        }
    }
};