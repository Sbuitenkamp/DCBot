module.exports = {
    name: 'remove',
    description: 'remove a certain user\'s roles (only use for roles that are higher than entry)',
    syntax: 'remove <@username> <rolename>, <rolename> etc (for 1 role dont use commas)',
    type: 'admin',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message, permitted, notPermitted, args, argument) {
        if (permitted) {
            if (args[0] !== '') {
                if (args[1] !== '') {
                    args = args.splice(1);
                    let arguments = [];
                    let roleList = [];
                    let roles = '';
                    const person = message.mentions.members.first();
                    if (argument.includes(',')) {
                        arguments = argument.split(',');
                    } else {
                        arguments[0] = argument;
                    }
                    arguments[0] = arguments[0].split('>')[1];
                    arguments.forEach(arg => {
                        role = message.guild.roles.find(role => role.name.toLowerCase() === arg.toLowerCase().trim());
                        if (role && role.name.trim() !== 'entry' && role.name.trim() !== 'Certified Normies' && role.name.trim() !== 'Supreme One') {
                            roleList.push(role);
                        }
                    });
                    roleList.forEach(role => {
                        person.removeRole(role).catch(console.error);
                        roles += role.name + ', ';
                    });
                    roles = roles.replace(/,\s*$/, '');
                    if (roles !== '') {
                        message.channel.send(`Removed these roles: ${roles} from ${person}`);
                    } else {
                        message.channel.send(`No roles removed from ${person}`);
                    }
                    roleList = [];
                    roles = '';
                } else {
                    message.channel.send(`Please specify a role.`);
                }
            } else {
                message.channel.send(`Please specify a person.`);
            }
        } else {
            message.channel.send(notPermitted);
        }
    }
};