const welcomeId = '490856171104632834';
module.exports = {
    name: 'give',
    description: `give a certain user's roles (only use for roles that are higher than entry, for game roles redirect them to <#${welcomeId}>)`,
    syntax: 'give <@member> <rolename>, <rolename> etc (if only adding 1 dont use comma)',
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
                        const role = message.guild.roles.find(role => role.name.toLowerCase() === arg.toLowerCase().trim());
                        if (role && role.name.trim() !== 'Certified Normies' && role.name.trim() !== 'Supreme One') {
                            roleList.push(role);
                        }
                    });
                    roleList.forEach(role => {
                        person.addRole(role).catch(console.error);
                        roles += role.name + ', ';
                        // console.log('   role: ' + role);
                    });
                    roles = roles.replace(/,\s*$/, '');
                    if (roles !== '') {
                        message.channel.send(`Given these roles: ${roles} to ${person}`);
                    } else {
                        message.channel.send(`No roles given to ${person}`);
                    }
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