/* eslint-disable import/named */
import { requireDirectory } from '../utils';
import { prefix } from '../settings';

const commands = Object.values(requireDirectory()).reduce((acc, command) => ({
    ...acc,
    [`${prefix}${command.keyword}`]: command.default,
}), {});

export default commands;
