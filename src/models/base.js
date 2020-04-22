/* eslint-disable no-restricted-syntax */

class BaseModel {
    constructor(data) {
        for (const [key, value] of Object.entries(data)) {
            this[key] = value;
        }
        this.modelName = this.constructor.name;
    }

    delete() {
        delete this.memoryDB[this.modelName][this.id];
    }
}

export default BaseModel;
