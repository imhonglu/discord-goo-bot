const jobSearchKessage = '구직합니다.';

export const keyword = '구직';

export default async msg => {
    const { nickname } = msg.member;
    msg.channel.send(`@here ${nickname} ${jobSearchKessage}`);
};
