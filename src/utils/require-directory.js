/* eslint-disable import/no-dynamic-require, global-require, no-param-reassign */
import fs from 'fs';
import path from 'path';

const pascalRegex = /(^\w|-\w|_\w)/g;
const kebabRegex = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
const camelRegex = /(-\w)/g;

const toCase = {
    pascal: string => string.replace(
        pascalRegex,
        s => (s.length === 2 ? s[1].toUpperCase() : s.toUpperCase()),
    ),
    kebab: string => string.replace(
        kebabRegex,
        s => `-${s.toLowerCase()}`,
    ),
    camel: string => string.replace(
        camelRegex,
        s => s[1].toUpperCase(),
    ),
    none: string => string,
};

function getStack() {
    const { prepareStackTrace } = Error;
    Error.prepareStackTrace = (_, stack) => stack;
    const stack = new Error().stack.slice(1);
    Error.prepareStackTrace = prepareStackTrace;
    return stack;
}

function getCallerDirectory() {
    const stack = getStack();
    const callerFilename = stack[2].getFileName();
    return path.dirname(callerFilename);
}

function indexDirectory(props = {}) {
    const { caseName = 'camel', pathName, callback, useDefault } = props;

    const directory = pathName || getCallerDirectory();
    const files = fs.readdirSync(directory);
    return files.reduce((acc, fileName) => {
        const filePath = `${directory}/${fileName}`;
        const extName = path.extname(filePath);
        const baseName = path.basename(filePath, extName);
        if (!pathName && baseName === 'index') return acc;

        const required = require(filePath);
        const hasDefault = Object.prototype.hasOwnProperty.call(required, 'default');
        const isDirectory = fs.lstatSync(filePath).isDirectory();
        const key = toCase[caseName](baseName);

        if (pathName && baseName === 'index') {
            acc = hasDefault ? required.default : required;
        } else if (isDirectory) {
            const options = {
                ...props,
                pathName: filePath,
            };
            acc[key] = indexDirectory(options);
        } else if (callback) {
            acc[key] = callback(filePath);
        } else {
            acc[key] = useDefault && hasDefault ? required.default : required;
        }
        return acc;
    }, {});
}

export default indexDirectory;
