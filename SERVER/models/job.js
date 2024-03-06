import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    location: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        required: true
    },
    salaryRange: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    closingDate: {
        type: Date
    }
});

export default mongoose.model('Job', jobSchema);