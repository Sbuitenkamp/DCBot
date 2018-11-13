module.exports = {
    name: 'rule2',
    description: 'displays the supreme rule2',
    syntax: 'rule2',
    type: 'normal',
    init: function (token) {
        this.syntax = token + this.syntax;
    },
    execute(message) {
        message.channel.send(`  
         2. Shadew is always right.
3. If Shadew isn't right rule 2 takes immediate effect!`);
    }
};