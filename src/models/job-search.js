import BaseModel from './base';

class JobSearch extends BaseModel {
    offer(callback) {
        if (callback) {
            callback(this.id);
        }
        this.delete();
    }
}

export default JobSearch;
