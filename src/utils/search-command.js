/* eslint-disable no-restricted-syntax */

function searchKeyword(message, keywordList) {
    for (const keyword of keywordList) {
        const isMatched = message.includes(keyword);
        if (isMatched) {
            return true;
        }
    }
    return false;
}

function searchCommand(message, commandList) {
    for (const [keywordList, command] of commandList) {
        const isMatched = searchKeyword(message, keywordList);
        if (isMatched) {
            return command;
        }
    }
    return undefined;
}

export default searchCommand;
