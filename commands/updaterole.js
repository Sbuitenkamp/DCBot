module.exports = {
    name: 'updaterole',
    description: 'update role voicechannels',
    syntax: 'updaterole <rolename>, <amount of channels>\\*<member limit>',
    type: 'admin',
    subtype: 'role',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message, notPermitted, argument, rolehandler) {
        if (message.member.roles.some(r => ['Supreme One'].includes(r.name))) {
            const args = argument.split(',');
            if (args.length === 2) {
                let role = {name: args[0].trim()};
                let channelSettings = args[1].trim().split('*');
                rolehandler(message, role, false, true, null, parseInt(channelSettings[0]), parseInt(channelSettings[1]));
            } else {
                message.channel.send('I need moar info (or I have too much)');
            }
        } else {
            message.channel.send(notPermitted);
        }
    }
};