module.exports = {
    name: 'joinmute',
    async execute(member, guild, roles, warnings) {
        const role = [guild.roles.find(role => role.name === 'Shitposted in the wrong neighbourhood')];
        let memberRoles = member.roles.map(role => role.name);
        let index = memberRoles.indexOf('@everyone');
        if (index > -1) memberRoles.splice(index, 1);
        memberRoles = memberRoles.join(',');
        const row = await roles.findOne({where: {id: member.id}});
        if (row) {
            const affectedRows = await warnings.update({roles: memberRoles}, {where: {id: member.id}});
            if (affectedRows < 0) return console.log(`Could not save ${member}'s roles...`);
        } else {
            const makeRow = await roles.create({
                id: member.id,
                roles: memberRoles
            });
            if (makeRow === undefined) return console.log(`Could not save ${member}'s roles...`);
        }
        member.setRoles(role).then(member.send(`Think you could escape the mute now could? ${member.displayName}, well let me tell you: it ain't happening chief.`)).catch(e => console.log(`${member.displayName} doesn't accept dms...`));
    }
};