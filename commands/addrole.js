module.exports = {
    name: 'addrole',
    description: 'create a new role for a game with selector in <#490856171104632834>',
    syntax: 'addrole <rolename>, <1st message>, <2nd message>, <emote>, <amount of voice channels>\\*<member limit>',
    type: 'admin',
    subtype: 'role',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message, notPermitted, argument, rolehandler) {
        if (message.member.roles.some(r => ['Supreme One'].includes(r.name))) {
            const args = argument.split(',');
            if (args.length === 5) {
                let role = {name: args[0].trim(), message1: args[1].trim(), message2: args[2].trim()};
                let emoji = args[3].trim().substring(1, args[3].trim().length - 1);
                let channelSettings = args[4].split('*');
                rolehandler(message, role, true, false, emoji, parseInt(channelSettings[0]), parseInt(channelSettings[1]));
            } else {
                message.channel.send('I need moar info (or I have too much)');
            }
        } else {
            message.channel.send(notPermitted);
        }
    }
};