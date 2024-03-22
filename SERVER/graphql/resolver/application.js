import Application from "../../models/application.js";
import User from "../../models/user.js";
import Job from "../../models/job.js";


export async function createApplication(parent, args, context, info) {
    try {
        console.log(args);
        const user = await User.findOne({ email: args.userId });
        if (!user) {
            throw new Error('User not found');
        }
        console.log(user);
        const job = await Job.findById(args.jobPostId);
        if (!job) {
            throw new Error('Job not found');
        }
        console.log(job);
        const application = new Application({
            user: user._id,
            job: job._id,
            status: 'Pending'
        });
        const result = await application.save();
        return { ...result._doc, _id: result.id };
    }
    catch (err) {
        throw err;
    }
}

//resolver to get all applications by user
export async function applicationsByUser(parent, args, context, info) {
    try {
        const user = await User.findOne({ email: args.userId });
        if (!user) {
            throw new Error('User not found');
        }
        const applications = await Application.find({ user: user._id }).populate('user').populate('job');
        return applications.map(application => {
            return { ...application._doc, _id: application.id };
        });
    } catch (err) {
        throw err;
    }
}

//resolver to get all applications by job
export async function applicationsByJob(parent, args, context, info) {
    try {
        const job = await Job.findById(args.jobPostId);
        if (!job) {
            throw new Error('Job not found');
        }
        const applications = await Application.find({ job: job._id }).populate('user').populate('job');
        return applications.map(application => {
            return { ...application._doc, _id: application.id };
        });
    } catch (err) {
        throw err;
    }
}

//resolver to update application status
export async function updateApplicationStatus(parent, args, context, info) {
    try {
        const application = await Application.findById(args.applicationId);
        if (!application) {
            throw new Error('Application not found');
        }
        application.status = args.status;
        const result = await application.save();
        return { ...result._doc, _id: result.id };
    } catch (err) {
        throw err;
    }
}

//resolver to delete application
export async function deleteApplication(parent, args, context, info) {
    try {
        const application = await Application.findById(args.applicationId);
        if (!application) {
            throw new Error('Application not found');
        }
        const result = await Application.findByIdAndDelete(args.applicationId);
        return { ...result._doc, _id: result.id };
    } catch (err) {
        throw err;
    }
}

//resolver to get application by id
export async function application(parent, args, context, info) {
    try {
        const application = await Application.findById(args.applicationId).populate('user').populate('job');
        return { ...application._doc, _id: application.id };
    } catch (err) {
        throw err;
    }
}
