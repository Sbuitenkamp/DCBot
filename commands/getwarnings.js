module.exports = {
    name: 'getwarnings',
    description: 'gets warned users',
    syntax: 'getwarnings',
    type: 'admin',
    subtype: 'db',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    async execute(message, permitted, notPermitted, person, warnings, discord) {
        if (permitted) {
            if (person === null) {
                if (message.mentions.members !== undefined) {
                    person = message.mentions.members.first();
                } else {
                    message.channel.send('I don\'t know that person');
                }
            }
            try {
                const warningsArray = await warnings.findAll({attributes: ['id', 'warned']});
                const warnString = warningsArray.map(w => message.guild.members.get(w.id).displayName + ': ' + w.warned + ' time(s)').join('\n') || 'No warnings yet.';
                const embed = new discord.RichEmbed()
                    .setColor('#09ad81')
                    .addField('List of people with warnings', `\n ${warnString}`)
                    .setFooter('You can get warnings for: spamming, harassment / being a jackass without reason, breaking the rules');
                return message.channel.send(embed);
            } catch (e) {
                console.log(e);
            }
        } else {
            message.channel.send(notPermitted);
        }
    }
};