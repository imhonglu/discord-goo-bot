const url = 'https://discord.gg';
const limit = 3;
const defaultMessage = '구인합니다.';

export const keywordList = [
    '구인',
    'ㄱㅇ',
];

export default async msg => {
    const { voiceChannel } = msg.member;
    if (!voiceChannel) {
        msg.reply('음성 채널에 참가해주세요.');
        return;
    }
    if (voiceChannel.members.size > limit) {
        msg.reply('해당 채널의 구인이 마감되었습니다.');
        return;
    }

    const invite = await voiceChannel.createInvite();
    const inviteUrl = `${url}/${invite.code}`;
    const offerNumber = limit - voiceChannel.members.size;
    const message = `
        \n@here ${inviteUrl}
        \n${offerNumber}명 ${defaultMessage}
    `;
    msg.channel.send(message);
};
