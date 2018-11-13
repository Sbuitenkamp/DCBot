module.exports = {
    name: 'deletedbentry',
    async execute(member, warnings, roles, muted, warMembers, warStats) {
        const rowCount = await warnings.destroy({where: {id: member.id}});
        const rowCount2 = await roles.destroy({where: {id: member.id}});
        const rowCount3 = await muted.destroy({where: {id: member.id}});
        const leftMember = await warMembers.findOne({where: {id: member.id}});
        const decreaseMember = await warStats.findOne({where: {id: leftMember.faction}});
        let rowCount4 = 0;
        decreaseMember.decrement('members');
        if (decreaseMember) rowCount4 = await warMembers.destroy({where: {id: member.id}});

        const count = rowCount + rowCount2 + rowCount3 + rowCount4;
        return console.log(count + ' row(s) removed from database.');
    }
};