import BaseModel from './base';

class JobOffer extends BaseModel {
    offer(callback) {
        this.offerNumber -= 1;
        if (this.offerNumber <= 0) {
            this.delete();
            return;
        }
        if (callback) {
            callback(this.inviteURL);
        }
    }
}

export default JobOffer;
