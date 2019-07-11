import Discord from 'discord.js';
import {
    prefix,
    token,
    allowedChannelIdList,
} from './settings';
import commands from './commands';

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    try {
        const { channel, content } = msg;
        if (!allowedChannelIdList.includes(channel.id)) {
            return;
        }
        if (!content.startsWith(prefix)) {
            return;
        }
        await commands[content](msg);
    } catch (e) {
        if (!(e instanceof TypeError)) {
            throw e;
        }
    }
});

client.login(token);
