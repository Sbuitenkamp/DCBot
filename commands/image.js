const fs = require('fs');
module.exports = {
    name: 'image',
    description: 'post image (only for people with permission to post images!)',
    syntax: 'image <imagename>',
    type: 'shitpost',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message, shitpostId, permitted, notPermitted, args, argument) {
        const shitpostChannel = message.channel.id === shitpostId;
        if (shitpostChannel || permitted) {
            if (argument !== '') {
                if (message.member.hasPermission('ATTACH_FILES')) {
                    if (fs.existsSync(`./images/${argument.trim()}.png`)) {
                        message.channel.send({files: [`./images/${argument.trim()}.png`]});
                        message.delete();
                    } else {
                        message.channel.send(`Image not found.`);
                    }
                } else {
                    message.channel.send(notPermitted);
                }
            } else {
                message.channel.send('Please specify an image');
            }
        } else {
            message.channel.send(`Can only use this command in <#${shitpostId}>.`);
        }
    }
};