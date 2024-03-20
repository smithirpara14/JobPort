import bcrypt from 'bcryptjs';
import Job from '../../models/job.js';
import User from '../../models/user.js';
import jwt from 'jsonwebtoken';

//resolver to get all job post by author
export async function jobPosts(parent, args, context, info) {
    // console.log("Job Posts:::");
    try {
        // Find the user document by email
        const user = await User.findOne({ email: args.userId });
        if (!user) {
            throw new Error('User with the provided email not found');
        }
        const jobPosts = await Job.find({ author: user._id }).populate('author');
        // console.log("Job Posts::: ", jobPosts);
        return jobPosts.map(jobPost => {
            return { ...jobPost._doc, _id: jobPost.id };
        });
    } catch (err) {
        throw err;
    }
}

//resolver to get all job posts
export async function allJobPosts(parent, args, context, info) {
    try {
        const jobPosts = await Job.find().populate('author');
        return jobPosts.map(jobPost => {
            return { ...jobPost._doc, _id: jobPost.id };
        });
    } catch (err) {
        throw err;
    }
}

//resolver to create a job post
export async function createJobPost(parent, args, context, info) {
    try {
        // Find the user document by email
        const author = await User.findOne({ email: args.userId });
        if (!author) {
            throw new Error('Author with the provided email not found');
        }
        const job = new Job({
            title: args.jobPostInput.title,
            description: args.jobPostInput.description,
            author: author._id,
            location: args.jobPostInput.location,
            experienceLevel: args.jobPostInput.experienceLevel,
            employmentType: args.jobPostInput.employmentType,
            salaryRange: args.jobPostInput.salaryRange,
            closingDate: args.jobPostInput.closingDate
        });

        const result = await job.save();

        return { ...result._doc, _id: result.id };
    } catch (err) {
        throw err;
    }
}

//resolver to get job post by id
export async function jobPost(parent, args, context, info) {
    try {
        const jobPost = await Job.findById(args.jobPostId).populate('author');
        return { ...jobPost._doc, _id: jobPost.id };
    } catch (err) {
        throw err;
    }
}

//resolver to update job post
export async function updateJobPost(parent, args, context, info) {
    try {
        // console.log("Update Job Input::: ", args);
        const job = await Job.findById(args.jobPostId);
        if (!job) {
            throw new Error('Job not found');
        }

        job.title = args.jobPostInput.title;
        job.description = args.jobPostInput.description;
        job.location = args.jobPostInput.location;
        job.experienceLevel = args.jobPostInput.experienceLevel;
        job.employmentType = args.jobPostInput.employmentType;
        job.salaryRange = args.jobPostInput.salaryRange;
        job.closingDate = args.jobPostInput.closingDate;

        const result = await job.save();
        // console.log("Update Job Result::: ", result);
        return { ...result._doc, _id: result.id };

    } catch (err) {
        console.log("Error::: ", err);
        throw err;
    }

}

//delete job post by id
export async function deleteJobPost(parent, args, context, info) {
    try {
        const job = await Job.findById(args.jobPostId);
        if (!job) {
            throw new Error('Job not found');
        }
        await Job.findByIdAndDelete(args.jobPostId);
        return { ...job._doc, _id: job.id };
    } catch (err) {
        throw err;
    }
}
