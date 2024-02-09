import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSeekerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    skills: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    }
});

export default mongoose.model('JobSeeker', jobSeekerSchema);