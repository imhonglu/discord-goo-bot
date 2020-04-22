/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/named */

import Discord from 'discord.js';

import {
    DEBUG,
    DEBUG_CHANNEL_ID,
    DEVELOPER_ID,
    TOKEN,
} from './settings';
import commands from './commands';
import searchCommand from './utils/search-command';

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    try {
        const { channel, content } = msg;
        const command = searchCommand(content, commands);
        if (!command) return;

        msg._args = content.split(' ').splice(1);
        msg._client = client;

        const isDebugChannel = channel.id === DEBUG_CHANNEL_ID;
        if (isDebugChannel) {
            if (DEBUG) {
                await command(msg);
            }
            return;
        }
        await command(msg);
    } catch (e) {
        const developer = await client.fetchUser(DEVELOPER_ID);
        const errorMessage = `Error: ${e.name}\nMessage: ${e.message}`;
        console.error(e);
        developer.send(errorMessage);
    }
});

client.login(TOKEN);
