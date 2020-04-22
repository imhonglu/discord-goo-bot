/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/named */

import requireDirectory from '../utils/require-directory';
import { COMMAND_PREFIX } from '../settings';

function dynamicImportCommands(commands) {
    const result = [];
    for (const { keywordList, default: command } of Object.values(commands)) {
        const _keywordList = keywordList.map(keyword => `${COMMAND_PREFIX}${keyword}`);
        result.push([
            _keywordList,
            command,
        ]);
    }
    return result;
}

const commands = dynamicImportCommands(requireDirectory());

export default commands;
