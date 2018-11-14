const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: 'images',
    description: 'gets all displayable images',
    syntax: 'images',
    type: 'shitpost',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message, shitpostId) {
        const shitpostChannel = message.channel.id === shitpostId;
        if (shitpostChannel) {
            let fileList = '';
            fs.readdir('./images', (err, files) => {
                files.forEach(file => {
                    fileList += ` ${file.split('.').shift()}\n`;
                });
                const imageMessage = new Discord.RichEmbed()
                    .setColor('#09ad81')
                    .addField('Here is a list of images you can send with $image:', fileList.trim());
                message.channel.send(imageMessage);
            });
        } else {
            message.channel.send(`Can only use this command in <#${shitpostId}>.`);
        }
    }
};