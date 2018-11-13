module.exports = {
    name: 'startbattle',
    description: 'Start the battle',
    syntax: 'startbattle',
    init(token) {
        this.syntax = token + this.syntax;
    },
    async execute(warMembers, warStats, arsenal, bigguns, message, discord, battleHandler) {
        const battlefield = await message.guild.channels.find(c => c.name.toLowerCase().trim() === 'battlefield');
        return battlefield.send(`
\`\`\`diff
-THIS SHIT IS ON HOLD CUZ THERES 2 MANY HOLES IN MY LOGIC :/
\`\`\`
        `);
        let spetsnazMembers = 0;
        let ssMembers = 0;
        const warEmbed = new discord.RichEmbed()
            .setTitle('Time for a battle!')
            .setColor('#09ad81')
            .addField('If you have pledged your alliance to a team you can type "I will fight" to participate. You have 5 minutes','Overview of amount of members on each team:')
            .addBlankField()
            .addField('Spetsnaz', `
                ${spetsnazMembers} members
            `, true)
            .addField('SS', `
                ${ssMembers} members
            `, true);

        battlefield.send('<@ &491343376235364362> <@ &493778206445404160>', {embed: warEmbed}).then(embed => {
            const collector = battlefield.createMessageCollector(m => m.content.toLowerCase().trim() === 'i will fight' && !m.member.battleJoined && (m.member.roles.has('491343376235364362') || m.member.roles.has('493778206445404160')), {time: 6000});
            collector.on('collect', async element => {
                if (element.member.battleJoined) return console.log(`${element.member.displayName} already joined.`);
                const member = await warMembers.findOne({where: {id: element.author.id}});
                if (member) {
                    switch (member.dataValues.faction) {
                        case 1:
                            spetsnazMembers++;
                            break;
                        case 2:
                            ssMembers++;
                            break;
                        default:
                            console.log(`error getting ${element.author}'s team THONKHYPER`);
                            break;
                    }
                    embed.edit(new discord.RichEmbed()
                        .setTitle('Time for a battle!')
                        .setColor('#09ad81')
                        .addField('If you have pledged your alliance to a team you can type "I will fight" to participate','Overview of amount of members on each team:')
                        .addBlankField()
                        .addField('Spetsnaz', `
                            ${spetsnazMembers} members
                        `, true)
                        .addField('SS', `
                            ${ssMembers} members
                        `, true));
                }
                element.member.battleJoined = true;
            });
            collector.on('end', collected => {
                battleHandler(collected, embed, battlefield);
            });
        });
    }
};