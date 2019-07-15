import { DEBUG } from '../settings';

export const keywordList = [
    '에러',
    'ㅇㄹ',
];

export default async () => {
    if (DEBUG) {
        throw Error('test');
    }
};
