import mongoose from "mongoose";

const { Schema } = mongoose;

const applicationStatusSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

export default mongoose.model('ApplicationStatus', applicationStatusSchema);
