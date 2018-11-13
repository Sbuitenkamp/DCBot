module.exports = {
    name: 'removerole',
    description: 'removes a gaming role for a game and its selector in <#490856171104632834>',
    syntax: 'removerole <rolename>',
    type: 'admin',
    subtype: 'role',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message, notPermitted, argument, rolehandler) {
        if (message.member.roles.some(r => ['Supreme One'].includes(r.name))) {
            let role = {name: argument.trim()};
            rolehandler(message, role, false, false);
        } else {
            message.channel.send(notPermitted);
        }
    }
};