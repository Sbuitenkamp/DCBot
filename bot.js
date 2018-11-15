const Discord = require('discord.js');
const Sequelize = require('sequelize');
const fs = require('fs');
const config = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.botCommands = new Discord.Collection();
client.warCommands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const botCommandFiles = fs.readdirSync('./botcommands').filter(file => file.endsWith('.js'));
const warCommandFiles = fs.readdirSync('./warcommands').filter(file => file.endsWith('.js'));
botCommandFiles.forEach(file => {
    const command = require(`./botcommands/${file}`);
    client.botCommands.set(command.name, command);
});
commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    command.init(config.prefix);
    client.commands.set(command.name, command);
});
warCommandFiles.forEach(file => {
    const command = require(`./warcommands/${file}`);
    command.init(config.prefix);
    client.warCommands.set(command.name, command);
});
const tables = client.botCommands.get('dbinit').execute(Sequelize);
const welcomeId = '511849121632616449';
const shitpostId = '511849703357546497';
const wwId = '502110242952314880';
let warCommands = '';
let normalCommands = '';
let normalSyntaxes = '';
let shipostCommands = '';
let shipostSyntaxes = '';
let adminCommands = '';
let adminSyntaxes = '';
let ownerCommands = '';
let ownerSyntaxes = '';
let argument = '';
let spetsnazPoints = 0;
let ssPoints = 0;
let spetsnazMembers = 0;
let ssMembers = 0;+
client.commands.forEach(command => {
    if (command.subtype !== 'role' && command.type === 'admin') {
        adminCommands += `${command.name}: ${command.description} \n\n`;
        adminSyntaxes += `${command.name}: ${command.syntax} \n\n`;
    } else if (command.type === 'shitpost') {
        shipostCommands += `${command.name}: ${command.description} \n`;
        shipostSyntaxes += `${command.name}: ${command.syntax} \n`;
    } else if (command.subtype === 'role') {
        ownerCommands += `${command.name}: ${command.description} \n`;
        ownerSyntaxes += `${command.name}: ${command.syntax} \n`;
    } else {
        normalCommands += `${command.name}: ${command.description} \n`;
        normalSyntaxes += `${command.name}: ${command.syntax} \n`;
    }
});
client.warCommands.forEach(command => warCommands += `${command.name}: ${command.description} \n`);
const removeEmbed = new Discord.RichEmbed()
    .setColor('#09ad81')
    .setTitle('This message was deleted');
const commands = new Discord.RichEmbed()
    .setColor('#09ad81')
    .addField(`Overview of commands using the '${config.prefix}' prefix`, `
  ${normalCommands.trim()}
  
  Commands only usable in <#${shitpostId}>:
  
  ${shipostCommands.trim()}`)
    .addBlankField()
    .addField('Admin only commands:', `
  ${adminCommands.trim()}`)
    .addBlankField()
    .addField('Owner only commands', `
  ${ownerCommands.trim()}`)
    .addBlankField()
    .setFooter(`Mistyped something? dont worry, if you edit the message then I will still be able to read it! Use ${config.prefix}syntaxes to check how to use the commands`);
const syntaxes = new Discord.RichEmbed()
    .setColor('#09ad81')
    .addField(`Overview of syntaxes for commands using the '${config.prefix}' prefix`, `
  ${normalSyntaxes.trim()}
  
  Commands only usable in <#${shitpostId}>:
  
  ${shipostSyntaxes.trim()}`)
    .addBlankField()
    .addField('Admin only commands:', `
  ${adminSyntaxes.trim()}`)
    .addBlankField()
    .addField('Owner only commands', `
  ${ownerSyntaxes.trim()}`)
    .addBlankField()
    .setFooter(`Mistyped something? dont worry, if you edit the message then I will still be able to read it! Use ${config.prefix}help to check what the commands do`);
const welcome = [`
Rules:
 1. Keep messages to their respective channels.
 2. Shadew is always right
 3. If Shadew isn't right rule 2 takes immediate effect!
 4. Unless it's relevant to the conversations, keep images to <#${shitpostId}> or <#511849682218123265>
 4. No spamming, or annoying behaviour
 5. @everyone or @here only for mods.
 6. Certified Normies are mods..... please make fun of them.
 7. Don't take everything too serious just have fun, talk and enjoy yourself.... OR ELSE. (except the rules they are supreme and should be obeyed without question)

Roles:
 SUPREME ONE. Owner
 Certified Normies. Mods (big gay)
 Devs. People who help me (Shadew) with developing my bot
 Tortle. No you're not getting it, stop asking
 Gamer Gurl. Them sweet girl gamers
 Younglings. Cool peoples
 Spetsnaz. USSR Comrades
 Die SS. Nazis
 
 Here is an invite link so you can invite your friends https://discord.gg/HZDmuVQ

 We also have gaming roles, check below to get them.
 
 Click on the emojis below to get the role associated to that emoji (if you don't see emojis go to settings->Text & Images-> and make sure "Show emoji reactions on messages." is checked!)
  |
  |
 V
`];
const warResults = new Discord.RichEmbed()
    .setColor('09ad81')
    .setTitle('Current war statistics')
    .addField('Spetsnaz', `
        ${spetsnazPoints} wins
        ${spetsnazMembers} members
    `, true)
    .addField('SS', `
        ${ssPoints} wins
        ${ssMembers} members
    `, true);
const whatIs = ['ligma', 'sugondese', 'sawcon', 'sugma', 'fugma', 'eatma'];
const warnings = tables.warnings;
const roles = tables.roles;
const muted = tables.muted;
const warMembers = tables.warTables.warMembers;
const warStats = tables.warTables.warStats;
const arsenal = tables.warTables.arsenal;
const bigGuns = tables.warTables.bigGuns;
client.on('ready', () => {
    client.user.setPresence({
        status: 'online',
        game: { name: `the server | ${config.prefix}help for more info`, type: "WATCHING" }
    });
    warnings.sync();
    roles.sync();
    muted.sync();
    // ww2 minigame
    warMembers.sync();
    warStats.sync();
    arsenal.sync();
    bigGuns.sync();

    console.log('ShadBot up and running. \nProtect-and-serve.');
});
client.on('guildBanAdd', (guild, member) => {
    client.botCommands.get('deletedbentry').execute(member, warnings, roles, muted, warMembers, warStats);
});
client.on('guildMemberAdd', async (member) => {
    const foundMember = await muted.findOne({where: {id: member.id}});
    if (foundMember) {
        if (foundMember.dataValues.muted) client.botCommands.get('joinmute').execute(member, member.guild, roles, warnings);
    }
});
// reeeeeeeeeeeeeeee my key
client.login(config.token);
client.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t === 'MESSAGE_REACTION_REMOVE') {
        if (event.d.channel_id === welcomeId) {
            let channel = client.channels.get(welcomeId);
            let message = channel.fetchMessage(event.d.message_id).then(async msg => {
                let user = msg.guild.members.get(event.d.user_id);

                if (msg.author.id === client.user.id && msg.content !== welcome) {
                    let re = `\\*\\*"(.+)?(?="\\*\\*)`;
                    // selects text thats inbetween **""**
                    let role = msg.content.match(re)[1];
                    const row = await muted.findOne({where: {id: user.id}});
                    let isMuted = false;
                    if (row) {
                        if (row.dataValues.muted) isMuted = true;
                    }

                    if (user.id !== client.user.id && !isMuted) {
                        // console.log(role);
                        let roleObj = msg.guild.roles.find(r => r.name.toLowerCase() === role.toLowerCase());
                        let memberObj = msg.guild.members.get(user.id);

                        if (event.t === 'MESSAGE_REACTION_ADD'){
                            memberObj.addRole(roleObj);
                        } else {
                            memberObj.removeRole(roleObj);
                        }
                    }
                }
            });
        } else if (event.d.channel_id === wwId) {
            let channel = client.channels.get(wwId);
            let message = channel.fetchMessage(event.d.message_id).then(async msg => {
                let user = msg.guild.members.get(event.d.user_id);

                if (msg.author.id === client.user.id && msg.content !== welcome) {
                    let re = `\\*\\*"(.+)?(?="\\*\\*)`;
                    // selects text thats inbetween **""**
                    let role = msg.content.match(re)[1];

                    if (user.id !== client.user.id) {
                        // console.log(role);
                        const spetsnaz = msg.guild.roles.find(r => r.name.toLowerCase() === 'spetsnaz');
                        const ss = msg.guild.roles.find(r => r.name.toLowerCase() === 'die ss');
                        let roleObj = msg.guild.roles.find(r => r.name.toLowerCase() === role.toLowerCase());
                        let memberObj = msg.guild.members.get(user.id);

                        const member = await warMembers.findOne({where: {id: memberObj.id}});
                        const roleId = await warStats.findOne({where: {faction: roleObj.name.trim()}});
                        if (event.t === 'MESSAGE_REACTION_ADD'){
                            if (memberObj.roles.has(spetsnaz.id)) {
                                if (role.toLowerCase() === 'die ss') {
                                    msg.reactions.first().remove(memberObj);
                                    return memberObj.send('you can\'t be both a member of die ss and the spetsnaz').catch(err => console.log(`tell ${memberObj.displayName} that they can't be both ss and spetsnaz`));
                                }
                            } else if (memberObj.roles.has(ss.id)) {
                                if (role.toLowerCase() === 'spetsnaz') {
                                    msg.reactions.first().remove(memberObj);
                                    return memberObj.send('you can\'t be both a member of die ss and the spetsnaz').catch(err => console.log(`tell ${memberObj.displayName} that they can't be both ss and spetsnaz`));
                                }
                            }
                            if (member) {
                                const affectedRows = await warMembers.update({faction: roleId.id}, {where: {id: memberObj.id}});
                                if (affectedRows < 0) return console.log(`Could not save ${memberObj.displayName}'s war faction...`);
                            } else {
                                const makeRow = await warMembers.create({
                                    id: memberObj.id,
                                    faction: roleId.id
                                });
                                if (makeRow === undefined) return console.log(`Could not save ${memberObj.displayName}'s war faction...`);
                            }
                            roleId.increment('members');
                            memberObj.addRole(roleObj);
                        } else if (event.t === 'MESSAGE_REACTION_REMOVE') {
                            if (!member) return;
                            if (member.faction !== roleId.id) return;
                            if (member) {
                                const affectedRows = await warMembers.update({faction: null}, {where: {id: memberObj.id}});
                                if (affectedRows < 0) return console.log(`Could not save ${memberObj.displayName}'s war faction...`);
                                roleId.decrement('members');
                            }
                            memberObj.removeRole(roleObj);
                        }
                    }
                }
            });
        }

    }
});
client.on('message', message => {
    handleMessage(message, false);
});
client.on('messageUpdate', (oldMessage, newMessage) => {
    handleMessage(newMessage, true);
});
process.on('unhandledRejection', e => {
    let newStack = '';
    console.error(e.message, e.stack);
    if (e.message.length + e.stack.length >= 6001) {
        newStack = e.stack.slice(e.stack.length - e.message.length);
    }
    if (client.guilds !== undefined) return;
    client.guilds.first().members.get('174952948516782081').send(`There is something wrong with the bot!!!!
    Error:
    ${e.message}
    ${e.stack}
    ${newStack}
    Send help!!!!!`);
});
client.on('error', error => {
    console.log('this is some real heresy happening here chief:');
    switch (error.name) {
        default:
            console.log(`ShadBot | Unknown error occurred:\n ${error.message}`);
            break;
    }
});
function battle(collected, embed, battlefield) {
    embed.channel.send('Time is up! The battle will now start');
    for (let memb of collected) {
        console.log(memb[1].member.displayName);
        const filter = m => m.member.id === memb[1].member.id;
        const battleCollector = battlefield.createMessageCollector(filter);
        battlefield.send(`It's ${memb[1].member}'s turn. What would you like to do: shoot or reload`);
        battleCollector.on('collect', el => {
            switch(el.content.toLowerCase()) {
                case 'shoot':
                    const target = battlefield.createMessageCollector(m => m.id === el.member.id);
                    battlefield.send('Who do you aim at? (tag them)');
                    target.on('collect', async element => {
                        let member = await warMembers.findOne({where: {id: el.member.id}});
                        if (element.mentions.users.first()) {
                            let target = await warMembers.findOne({where: {id: element.mentions.users.first().id}});
                            let targetLoadout = await arsenal.findOne({where: {id: target.dataValues.loadout}});
                            let chance = Math.floor(Math.random() * 101);
                            if (element.mentions.users.first().hasArmor === undefined) element.mentions.users.first().hasArmor = true;
                            if (chance < member.dataValues.accuracy) {
                                if (targetLoadout.dataValues.armor !== 0) {
                                    battlefield.send(`Hit ${element.mentions.users.first()} for ${target.dataValues.damage} damage, but his armor stopped it`);

                                }
                            }
                        }
                    });
                    break;
                case 'reload':
                    break;
            }
        });
    }
}
function generateMessages(rolesObj) {
    let messages = [];
    rolesObj.forEach(role => {messages.push(`${role.message1} **"${role.name}"** ${role.message2}`);});
    return messages;
}
async function handleRoles(message, role, add, update, emote, channelAmount, channelSize) {
    const guild = message.guild;
    let channel = message.guild.channels.get(welcomeId);
    if (add) {
        if (guild.emojis.find(e => e.id === emote.split(':')[2])) {
            if (Number.isInteger(channelAmount) || Number.isInteger(channelSize)) {
                let rolesObj = [role];
                let emotes = [emote];
                guild.createRole({
                    name: role.name,
                    mentionable: true
                }).then(r => {
                    const perms = [{id: guild.id, deny: ['VIEW_CHANNEL']}, {id: r.id, allow: ['VIEW_CHANNEL', 'ATTACH_FILES']}];
                    guild.createChannel(r.name, {type: 'category'}, perms).then(category => {
                        guild.createChannel(role.name.replace(' ', '-'), {type: 'text', parent: category, permissionOverwrites: perms}).catch(e => console.log(e));
                        guild.createChannel(role.name + ' General Discussion/Talk', {type: 'voice', parent: category, permissionOverwrites: perms}).catch(e => console.log(e));
                        for (let i = 0; i < channelAmount; i++) {
                            guild.createChannel(role.name, {type: 'voice', userLimit: channelSize, parent: category, permissionOverwrites: perms}).catch(e => console.log(e));
                        }
                    }).catch(console.error);
                }).catch(console.error);
                let toSend = generateMessages(rolesObj);
                let mappedArray = toSend.map((message, idx) => [message, emotes[idx]]);
                console.log(mappedArray);
                mappedArray.forEach(mapObj => {
                    channel.send(mapObj[0]).then(sent => {
                        if (mapObj[1]) {
                            sent.react(mapObj[1]);
                        }
                    });
                });
            } else {
                message.channel.send('How many channels my guy.');
            }
        } else {
            message.channel.send('That is not an emoji.');
        }
    } else if (update) {
        if (Number.isInteger(channelAmount) || Number.isInteger(channelSize)) {
            const channelsToEdit = guild.channels.filter(c => c.name.toLowerCase() === role.name.toLowerCase() && c.type === 'voice');
            const category = guild.channels.find(c => c.name.toLowerCase() === role.name.toLowerCase() && c.type === 'category');
            if (channelsToEdit.size > channelAmount) {
                for (let i = 0; i < channelsToEdit.size - channelAmount; i++) {
                    setTimeout(() => {
                        if (channelsToEdit.array()[i].type === 'voice') channelsToEdit.array()[i].delete().catch(console.error);
                    }, 1000 * (i + 1));
                }
            } else if (channelAmount > channelsToEdit.size) {
                console.log(channelAmount - channelsToEdit.size);
                const r = guild.roles.find(rl => rl.name.toLowerCase().trim() === role.name.toLowerCase().trim());
                const perms = [{id: guild.id, deny: ['VIEW_CHANNEL']}, {id: r.id, allow: ['VIEW_CHANNEL']}];
                for (let i = 0; i < channelAmount - channelsToEdit.size; i++) {
                    setTimeout(() => {
                        console.log('settimeout');
                        guild.createChannel(role.name, {type: 'voice', userLimit: channelSize, parent: category, permissionOverwrites: perms}).catch(console.error);
                    }, 1000 * (i + 1));
                    channelsToEdit2 = guild.channels.filter(c => c.name.toLowerCase() === role.name.toLowerCase());
                }
            }
            channelsToEdit.array().forEach(channelToEdit => {
                if (channelToEdit.userLimit !== channelSize && channelToEdit.type === 'voice') channelToEdit.setUserLimit(channelSize).catch(console.error);
            });
        }
    } else {
        // getting everything belonging to the role
        const roleToDelete = guild.roles.find(r => r.name.toLowerCase().trim() === role.name.toLowerCase().trim());
        const channelsToDelete = guild.channels.filter(c => c.name.toLowerCase().includes(role.name.toLowerCase()));
        const messagesToDelete = await channel.fetchMessages();
        // deleting the role and everything with it
        if (roleToDelete) roleToDelete.delete().catch(console.error);
        if (channelsToDelete) {
            channelsToDelete.array().forEach((channel, index) => {
                setTimeout(() => {
                    channel.delete().catch(console.error);
                }, 1000 * (index + 1));
            });
        }
        if (messagesToDelete) {
            messagesToDelete.array().forEach(m => {
                if (m.content.toLowerCase().includes(`**"${role.name}"**`.trim().toLowerCase())) m.delete();
            });
        }
    }
}
async function warn (person) {
    try {
        await warnings.findOrCreate({where: {id: person.id}}).then(warned => {
            console.log(warned[1]);
            if (!warned[1]) {
                warned[0].increment('warned');
            }
            const emb = new Discord.RichEmbed()
                .setTitle('This person has been warned:')
                .setColor('09ad81')
                .addField(`${person.displayName}`, `
Warnings: ${warned[0].dataValues.warned}
                `);
            person.guild.channels.get('512244472080367617').send(emb);
            return console.log(`${person} has been warned.`);
        });
    } catch (e) {
        console.log(e);
    }
}
function unmuteInterval(message, person, flag) {
    setInterval(async () => {
        if (flag) return;
        let mutedPeople = await muted.findAll({attributes: ['id', 'muted', 'muteTime']});
        for (let i = 0; i < mutedPeople.length; i++) {
            if (mutedPeople[i].dataValues.muted) {
                if (mutedPeople[i].dataValues.muteTime <= Math.round(new Date().getTime() / 1000)) {
                    const affectedRows = await muted.update({muted: false, muteTime: 0}, {where: {id: mutedPeople[i].dataValues.id}});
                    if (affectedRows < 0) return message.channel.send(`Could not save ${person}'s unmuted status...`);
                    handleMuting(message, person, false);
                    mutedPeople = await muted.findAll({attributes: ['id','muted', 'muteTime']});
                }
            } else if (!mutedPeople[i].dataValues.muted && i + 1 >= mutedPeople.length) {
                return flag = true;
            }
        }
    }, 5000);
}
function handleUnmuting(message, person, end, unmute, flag) {
    muted.findOrCreate({where: {id: person.id}, defaults: {id: person.id, muted: false, muteTime: end}}).then(async result => {
        if (!unmute) {
            if (!result[1]) {
                const affectedRows = await muted.update({muted: true, muteTime: end}, {where: {id: person.id}});
                if (affectedRows < 0) return message.channel.send(`Could not save ${person}'s mute time...`);
            } else {
                if (!result[0]) return message.channel.send(`Could not save ${person}'s mute time...`);
            }
        } else if (unmute) {
            if (!isMuted) return;
            const affectedRows = await muted.update({muted: false, muteTime: end}, {where: {id: person.id}});
            if (affectedRows < 0) return message.channel.send(`Could not save ${person}'s unmuted status...`);
        }
        unmuteInterval(message, person, flag);
    });
}
async function handleMuting(message, person, muted) {
    if (muted) {
        const role = [message.guild.roles.find(role => role.name === 'Shitposted in the wrong neighbourhood')];
        let memberRoles = person.roles.map(role => role.name);
        let index = memberRoles.indexOf('@everyone');
        if (index > -1) memberRoles.splice(index, 1);
        memberRoles = memberRoles.join(',');
        roles.findOrCreate({where: {id: person.id}, defaults: {id: person.id, roles: memberRoles}}).then(async result => {
            if (!result[1]) {
                const affectedRows = await warnings.update({roles: memberRoles}, {where: {id: person.id}});
                if (affectedRows < 0) return message.channel.send(`Could not save ${person}'s roles...`);
            } else {
                if (!result[0]) return message.channel.send(`Could not save ${person}'s roles...`);
            }
            person.setRoles(role).then(message.channel.send(`Muted ${person}. Moderators can do $unmute <name> to unmute.`)).catch(console.error);
        });
    } else {
        const result = await roles.findOne({where: {id: person.id}});
        const resultArray = result.roles.split(',');
        let roleArray = [];
        resultArray.forEach(role => roleArray.push(message.guild.roles.find(r => r.name === role)));
        person.setRoles(roleArray).then(person.send('You have been unmuted.').catch(e => console.log(`${person} doesn't accept dms :/`)));
    }
}
async function handleMessage(message, newMessage) {
    // bot doesn't reply to itself
    if (message.author.bot) return undefined;
    // don't respond to dms
    if (message.channel.type === 'dm') return undefined;
    // creating own properties for member
    if (message.member.count === undefined) message.member.count = 0;
    if (message.member.counter === undefined) message.member.counter = 0;
    if (message.member.battleJoined === undefined) message.member.battleJoined = false;

    if (message.mentions.users.first() === client.user) message.react(message.guild.emojis.get('502753395539443743'));
    // owner or admin for permission checking
    const permitted = message.member.roles.some(r=>['Supreme One', 'Certified Normies', 'ShadBot'].includes(r.name));
    // member
    const member = message.member || await message.guild.fetchMember(message);
    // content
    const content = message.content;
    // channel
    const channel = message.channel;
    // default error message
    const notPermitted = `I'm sorry ${member}, you don't have permission to use that command.`;

    if (message.content.startsWith(config.prefix) && message.channel.parentID !== '502118162347589643') {
        // Bot will listen for messages that will start with the prefix
        // no commands used on the bot
        if (message.mentions.users.array().includes(client.user) || message.mentions.users.array().includes(`<@${message.guild.id}>`)) return message.channel.send(`I don't know what you're trying to do but it ain't happening chief.`);
        // delete old message on update
        if (newMessage && client.user.lastMessage !== null) client.user.lastMessage.delete(1);
        // make every word part of the arguments array
        let args = content.substring(1).split(' ');
        // 1st word is the command
        const cmd = args[0].toLowerCase();
        // remove the cmd from array
        args = args.splice(1);
        // stick the arguments in one string
        args.forEach(arg => argument += arg + ' ');

        // owner only commands (placed here because the try-catch hijacks the code afterwards)
        if (message.member.roles.find(r => r.name.toLowerCase() === 'supreme one')) {
            const channel = await message.guild.channels.get(welcomeId);
            switch (cmd.toLowerCase()) {
                case 'edit':
                    const msgToEdit = await channel.fetchMessage('511860906486005771');
                    msgToEdit.edit(welcome);
                    return;
                case 'write':
                    channel.send(welcome);
                    return;
                case 'writereact':
                    channel.send('Click here to gain **"entry"** to the server.').then(m => m.react(':entry:494753443164979200'));
                    return;
            }

        }
        // use to log the every chat message (delete proof)
        console.log(`${member.displayName} used: ${cmd} | ${argument}`);

        if (!client.commands.has(cmd)) return message.channel.send(`That command doesn't exist.`);

        const command = client.commands.get(cmd);

        try {
            if (command.type === 'help') {
                command.execute(message, commands);
            } else if (command.type === 'syntax') {
                command.execute(message, syntaxes);
            } else if (command.type === 'shitpost') {
                command.execute(message, shitpostId, permitted, notPermitted, args, argument);
            } else if (command.subtype === 'mute') {
                command.execute(message, args, permitted, notPermitted, handleMuting, handleUnmuting);
            } else if (command.subtype === 'role') {
                command.execute(message, notPermitted, argument, handleRoles);
            } else if (command.subtype === 'db') {
                command.execute(message, permitted, notPermitted, null, warnings, Discord, warn);
            } else {
                command.execute(message, permitted, notPermitted, args, argument);
            }
        } catch (error) {
            console.log(error);
            message.channel.send(`There was an error executing that command, did you spell it right? ${config.prefix}help for all possible commands`);
        }
        argument = '';
        argument = argument.trim();
    } else if(message.content.startsWith(config.prefix) && message.channel.parentID === '502118162347589643') {
        // Bot will listen for messages that will start with the prefix
        // no commands used on the bot
        if (message.mentions.users.first() === client.user) return message.member.send(`I am a neutral party chief.`).catch(e => console.log('No dms'));
        // delete old message on update
        if (newMessage && client.user.lastMessage !== null) client.user.lastMessage.delete(1);
        // make every word part of the arguments array
        let args = content.substring(1).split(' ');
        // 1st word is the command
        const cmd = args[0].toLowerCase();
        // remove the cmd from array
        args = args.splice(1);
        // stick the arguments in one string
        args.forEach(arg => argument += arg + ' ');

        if (!client.warCommands.has(cmd)) return;

        const command = client.warCommands.get(cmd);

        try {
            command.execute(warMembers, warStats, arsenal, bigGuns, message, Discord, battle);
        } catch (e) {
            console.log(e);
        }

    } else if (!permitted && content.length >= 20 && (content.length - content.replace(/[A-Z]/g, '').length) > (content.length / 3)) {
        console.log(`${message.content} | caps remove`);
        channel.guild.channels.get('511849814112075776').send(removeEmbed.addField('Member', member).addField('Content', message.content).addField('Reason', 'spamming caps'));
        message.delete();
        channel.send('Woah woah watch the caps lad, else I will have to quickscope yer ass!');
        message.member.count++;
        if (message.member.count >= 5) {
            client.botCommands.get('mute').execute(message, handleMuting, 'spamming caps');
            message.channel.send(`${message.member} has been muted for spamming caps for 1 minute`);
            setTimeout(() => client.botCommands.get('unmute').execute(message, handleMuting), 60000);
        }
    } else if (content.toLowerCase().split(/[^a-z]+/g).includes('heck') || content.toLowerCase().split(/[^a-z]+/g).includes('frick')) {
        // check for anti-christian behaviour
        message.delete();
        channel.send('Woah woah christian server!');
        message.member.count++;
        if (message.member.count >= 3) {
            client.botCommands.get('mute').execute(message, handleMuting, 'anti-christian behaviour');
            setTimeout(() => client.botCommands.get('unmute').execute(message, handleMuting), 30000);
        }
    } else {
        // Not funny, old meme
        whatIs.forEach(what => {
            if (content.toLowerCase().includes(what)) {
                if (['bal', 'nut', 'dick', 'ass'].some(word => content.toLowerCase().includes(word))) {
                    channel.send(`No u.`);
                } else {
                    channel.send(`What's ${what}? 😳`);
                }
            }
        });
    }
    if (!message.member.roles.some(r=>['Supreme One', 'ShadBot'].includes(r.name))) {
        message.member.counter++;
        if (message.member.counter >= 4) {
            message.channel.send(`Hol up ${message.member}, I don't think you're supposed to send messages *that* fast`);
            client.botCommands.get('warn').execute(message.member, warn);
            console.log(`${message.member} has been warned.`);
        }
    }
    if (message.member.counter !== 0) setTimeout(() => message.member.counter = 0, 1500);
    if (message.member.count !== 0) setTimeout(() => message.member.count = 0, 60000);
}

// TODO: make ww2 minigame (on hold)