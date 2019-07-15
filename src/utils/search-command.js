/* eslint-disable no-restricted-syntax */
import searchKeyword from './search-keyword';

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
