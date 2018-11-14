const fs = require('fs');
module.exports = {
    name: 'gif',
    description: 'post gif (only for people with permission to post gifs!)',
    syntax: 'gif <gifname>',
    type: 'shitpost',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message, shitpostId, permitted, notPermitted, args, argument) {
        const shitpostChannel = message.channel.id === shitpostId;
        if (shitpostChannel || permitted) {
            if (argument !== '') {
                if (message.member.hasPermission('ATTACH_FILES')) {
                    // console.log(argument); // argument value
                    if (fs.existsSync(`./gifs/${argument.trim()}.gif`)) {
                        message.channel.send({files: [`./gifs/${argument.trim()}.gif`]});
                        message.delete();
                    } else {
                        message.channel.send(`Gif not found.`);
                    }
                } else {
                    message.channel.send(notPermitted);
                }
            } else {
                message.channel.send('Please specify a gif');
            }
        } else {
            message.channel.send(`Can only use this command in <#${shitpostId}>.`);

        }
    }
};