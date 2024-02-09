import mongoose from "mongoose";

const { Schema } = mongoose;

const savedJobSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job'
    },
    savedDate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('SavedJob', savedJobSchema);