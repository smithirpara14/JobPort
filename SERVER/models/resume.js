import mongoose from 'mongoose';

const { Schema } = mongoose;

const resumeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
});

export default mongoose.model('Resume', resumeSchema);