import mongoose from "mongoose";

const { Schema } = mongoose;

const applicationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job'
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'ApplicationStatus'
    }

});

export default mongoose.model('Application', applicationSchema);