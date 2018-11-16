module.exports = {
    name: 'mute',
    description: 'removes all roles and gives Shitposted in the wrong neighbourhood (mute role)(It checks every 5 seconds so using 12S will result in 15S mute)',
    syntax: 'mute <@membername> 00D 00H 00M 00S "reason" (It checks every 5 seconds so using 12S will result in 15S mute)',
    type: 'admin',
    subtype: 'mute',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message, args, permitted, notPermitted, muteHandler, unMuter) {
        if (permitted) {
            if (message.mentions.members !== undefined) {
                const person = message.mentions.members.first();
                if (!person.roles.some(r=>['Supreme One', 'Certified Normies', 'ShadBot'].includes(r.name))) {
                    if (person.roles.array().length === 2 && person.roles.find(role => role.name === 'Shitposted in the wrong neighbourhood')) {
                        message.channel.send('This person is already muted.');
                    } else {
                        args.shift();
                        if (!args.length >= 1) return message.channel.send(`Please specify a duration of the mute.`);
                        let time = 0;
                        let reason;
                        for (let arg of args){
                            console.log(args + ' arg: ' + arg);
                            if (arg.trim().length !== 3 || parseInt(arg.substring(0, arg.length-1)).toString().length !== 2 || arg.substring(arg.length-1, 1).length !== 1) return message.channel.send(`${arg} is not the correct syntax. Correct syntax: ${this.syntax}`);
                            if (arg.includes('"')) reason = arg;
                            if (arg.toLowerCase().includes('d')) time += parseInt(arg.substring(0, arg.length-1)) * 24 * 60 * 60;
                            if (arg.toLowerCase().includes('h')) time += parseInt(arg.substring(0, arg.length-1)) * 60 * 60;
                            if (arg.toLowerCase().includes('m')) time += parseInt(arg.substring(0, arg.length-1)) * 60;
                            if (arg.toLowerCase().includes('s')) time += parseInt(arg.substring(0, arg.length-1));
                        }
                        muteHandler(message, person, true, false, reason);
                        time = time + Math.round(new Date().getTime() / 1000);
                        // console.log('curdate: ' + Math.round(new Date().getTime() / 1000));
                        // console.log('time: ' + time);
                        unMuter(message, person, time, false);
                    }
                } else {
                    message.channel.send('I can\'t mute mods :/');
                }
            } else {
                message.channel.send('Please specify a person. ');
            }
        } else {
            message.channel.send(notPermitted);
        }
    }
};