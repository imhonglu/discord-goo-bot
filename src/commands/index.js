/* eslint-disable import/named */
import { requireDirectory } from '../utils';
import { prefix } from '../settings';

const commands = Object.values(requireDirectory()).reduce((acc, command) => {
    const keywordList = command.keywordList.map(keyword => `${prefix}${keyword}`);
    const result = [
        keywordList,
        command.default,
    ];
    acc.push(result);
    return acc;
}, []);
console.log(commands);
export default commands;
