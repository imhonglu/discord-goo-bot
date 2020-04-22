import memoryDB from '../memory-db';
import JobSearch from '../models/job-search';

const DEFAULT_MESSAGE = '구직합니다.';

export const keywordList = [
    '구직',
    'ㄱㅈ',
];

export default async msg => {
    const { nickname, user } = msg.member;
    const name = nickname || user.username;
    const [result] = memoryDB.findAll('JobOffer');
    if (result) {
        result.offer(inviteURL => {
            msg.author.send(inviteURL);
        });
        return;
    }

    const message = `
        \n@here ${name} ${DEFAULT_MESSAGE}(1시간 뒤 만료됩니다)
    `;

    const data = new JobSearch({
        memoryDB,
        id: msg.author.id,
    });
    memoryDB.create(msg.author.id, data);
    msg.channel.send(message);
};
