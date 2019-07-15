const defaultMessage = '구직합니다.';

export const keywordList = [
    '구직',
    'ㄱㅈ',
];

export default async msg => {
    const { nickname } = msg.member;
    msg.channel.send(`@here ${nickname} ${defaultMessage}`);
};
