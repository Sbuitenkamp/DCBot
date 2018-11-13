module.exports = {
    name: 'warn',
    async execute(message, person, warnings, muteHandler) {
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
    }
};