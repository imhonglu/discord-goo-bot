/* eslint-disable import/named */
import Discord from 'discord.js';
import { token } from './settings';
import commands from './commands';
import { searchCommand } from './utils';

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    try {
        const { channel, content } = msg;
        const command = searchCommand(content, commands);
        await command(msg);
    } catch (e) {
        if (!(e instanceof TypeError)) {
            console.error('error', e.message);
        }
    }
});

client.login(token);
