const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: 'gifs',
    description: 'gets all displayable gifs',
    syntax:'gifs',
    type: 'shitpost',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message, shitpostId) {
        const shitpostChannel = message.channel.id === shitpostId;
        if (shitpostChannel) {
            let fileList = '';
            fs.readdir('./gifs', (err, files) => {
                files.forEach(file => {
                    fileList += ` ${file.split('.').shift()}\n`;
                });
                const gifMessage = new Discord.RichEmbed()
                    .setColor('#09ad81')
                    .addField('Here is a list of gifs you can send with $gif:', fileList.trim());
                message.channel.send(gifMessage);
            });
        } else {
            message.channel.send(`Can only use this command in <#${shitpostId}>.`);
        }
    }
};