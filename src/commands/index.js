/* eslint-disable import/named */
import { requireDirectory } from '../utils';
import { PREFIX } from '../settings';

const commands = Object.values(requireDirectory()).reduce((acc, command) => {
    const keywordList = command.keywordList.map(keyword => `${PREFIX}${keyword}`);
    const result = [
        keywordList,
        command.default,
    ];
    acc.push(result);
    return acc;
}, []);

export default commands;
