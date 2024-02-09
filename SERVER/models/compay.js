import mongoose from "mongoose";

const { Schema } = mongoose;

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    adminUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default mongoose.model('Company', companySchema);