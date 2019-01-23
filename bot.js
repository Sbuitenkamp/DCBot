const { Client, RichEmbed } = require('discord.js');
const  { token } = require('./config.json');
const client = new Client();
// selects text thats inbetween **""**
const roleAssignId = '537572393523216404';
const roles = {
    'entry': '494753443164979200',
    'nsfw': '519121185859174401',
    'Warframe': '494752918419931146',
    'R6': '490859001727156234',
    'CS:GO': '494753905851236352',
    'For Honor': '490862188488032266',
    'DbD': '502039068658630676',
    'Overwatch': '514708802508029952',
    'Fortnite': '494753702914162708'
};
const re = `\\*\\*"(.+)?(?="\\*\\*)`;
client.login(token);
client.once("ready", () => console.log('RoleReact working'));
client.on("error", error => {
    const embed = new RichEmbed()
        .setTitle('Error')
        .setColor()
        .setDescription(`\`${error.message}\``);
    console.error(chalk.red(error.message));
    console.trace(chalk.red(error.stack));
    client.owner.send(embed).catch(e => console.error(e));
});
client.on("raw", packet  => {
    // reactions only pl0x
    if (!["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(packet.t)) return;
    if (packet.d.channel_id !== roleAssignId) return;
    const channel = client.channels.get(packet.d.channel_id);
    // cached messages don't need raw
    if (channel.messages.has(packet.d.message_id)) return;
    // yeet that badboi into the cache
    channel.fetchMessage(packet.d.message_id).then(message => {
        // account for custom emojis
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        const reaction = message.reactions.get(emoji) || {
            message,
            emoji
        };
        if (packet.t === "MESSAGE_REACTION_ADD") client.emit("messageReactionAdd", reaction, client.users.get(packet.d.user_id));
        if (packet.t === "MESSAGE_REACTION_REMOVE") client.emit("messageReactionRemove", reaction, client.users.get(packet.d.user_id));
    });
});
client.on("messageReactionAdd", (reaction, user) => roleReact(reaction, user, true));
client.on("messageReactionRemove", (reaction, user) => roleReact(reaction, user, false));
// client.once("message", async message => {
//     if (message.author.bot) return;
//     if (message.content !== `${message.guild.me} init` && message.member.id !== '174952948516782081') return;
//     const roleChannel = message.guild.channels.get(roleAssignId);
//     await roleChannel.send(`
//  Click on the emojis below to get the role associated to that emoji (if you don't see emojis go to settings->Text & Images-> and make sure "Show emoji reactions on messages." is checked!)
//   |
//   |
//  V
// `.trim());
//     for (const key in roles) {
//         setTimeout(async () => {
//             const message = await roleChannel.send(`Click here to get access to the **"${key}"** channels.`);
//             await message.react(client.emojis.get(roles[key]));
//         }, 1000);
//     }
// });
async function roleReact(reaction, user, add) {
    const msg = reaction.message;
    const member = msg.guild.member(user);
    if ([client.user.id, '511854724082040834'].includes(msg.author.id)) {
        if ([client.user.id, '511854724082040834'].includes(user.id)) return;
        if (member.roles.has('490871287082778624') && member.roles.size === 2) return;
        const roleName = msg.content.match(re)[1];
        const role = msg.guild.roles.find(r => r.name.trim().toLowerCase() === roleName.trim().toLowerCase());
        if (add) await member.addRole(role);
        else await member.removeRole(role);
    }
}