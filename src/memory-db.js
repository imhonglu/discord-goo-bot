import models from './models';

const HOUR = 3600000;

const memoryDB = {
    models,
    JobOffer: {},
    JobSearch: {},
    create(key, value) {
        memoryDB[value.modelName][key] = value;
        setTimeout(() => {
            memoryDB[value.modelName][key].delete();
        }, HOUR);
    },
    findAll(modelName) {
        return Object.values(memoryDB[modelName]);
    },
};

export default memoryDB;
