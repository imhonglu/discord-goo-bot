/* eslint-disable no-underscore-dangle */
import memoryDB from '../memory-db';
import JobOffer from '../models/job-offer';

const URL = 'https://discord.gg';
const DEFAULT_LIMIT = 4;
const DEFAULT_MESSAGE = '구인합니다.';

export const keywordList = [
    '구인',
    'ㄱㅇ',
];

export default async msg => {
    const [limit = DEFAULT_LIMIT] = msg._args;
    const { voiceChannel } = msg.member;

    if (!voiceChannel) {
        msg.reply('음성 채널에 참가해주세요.');
        return;
    }
    if (limit <= 1) {
        msg.reply('해당 채널에서 모집하고자 하는 최대 인원수를 입력해주세요.');
        return;
    }
    if (voiceChannel.members.size > limit) {
        msg.reply('해당 채널의 구인이 마감되었습니다.');
        return;
    }

    const invite = await voiceChannel.createInvite();
    const inviteURL = `${URL}/${invite.code}`;
    const offerNumber = limit - voiceChannel.members.size;
    const message = `
        \n@here ${offerNumber}명 ${DEFAULT_MESSAGE}(1시간 뒤 만료됩니다)
        \n${inviteURL}
    `;

    const [result] = memoryDB.findAll('JobSearch');
    if (result) {
        result.offer(id => {
            msg._client.users.get(id).send(inviteURL);
        });
        return;
    }

    const data = new JobOffer({
        memoryDB,
        offerNumber,
        inviteURL,
        id: voiceChannel.id,
    });

    memoryDB.create(voiceChannel.id, data);
    msg.channel.send(message);
};
