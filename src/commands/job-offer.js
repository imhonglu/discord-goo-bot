const url = 'https://discord.gg';
const limit = 3;
const jobOfferMessage = '구인합니다.';

export const keyword = '구인';

export default async msg => {
    const { voiceChannel } = msg.member;
    if (voiceChannel.members.size < limit) {
        const invite = await voiceChannel.createInvite();
        const inviteUrl = `${url}/${invite.code}`;
        const offerNumber = limit - voiceChannel.members.size;
        msg.channel.send(`\n@here ${inviteUrl} \n${offerNumber}명 ${jobOfferMessage} `);
    }
};
