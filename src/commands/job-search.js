const defaultMessage = '구직합니다.';

export const keywordList = [
    '구직',
    'ㄱㅈ',
];

export default async msg => {
    const { nickname, user } = msg.member;
    const name = nickname || user.username;
    const message = `@here ${name} ${defaultMessage}`;
    msg.channel.send(message);
};
