const Discord = require('discord.js');
const shitpostId = '490857550921859084';
module.exports = {
    name: 'emojis',
    description: 'list all animated emojis (you can also use normal ones but this command is specifically for non-nitro people)',
    syntax: 'emojis',
    type: 'shitpost',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message) {
        const emojis = message.guild.emojis.array();
        const shitpostChannel = message.channel.id === shitpostId;
        if (shitpostChannel) {
            let emojilist = '';
            emojis.forEach(emoji => {
                if (emoji.animated) {
                    emojilist += emoji.name + '\n';
                }
            });
            const emojiEmbed = new Discord.RichEmbed()
                .setColor('#09ad81')
                .addField('Here is a list of gifs you can send with $emoji:', emojilist.trim());
            message.channel.send(emojiEmbed);
        } else {
            message.channel.send(`Can only use this command in <#${shitpostId}>.`);
        }
    }
};