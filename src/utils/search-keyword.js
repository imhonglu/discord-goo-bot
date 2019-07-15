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

export default searchKeyword;
