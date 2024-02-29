import bcrypt from 'bcryptjs';
import Job from '../../models/job.js';
import User from '../../models/user.js';
import jwt from 'jsonwebtoken';

//resolver to get all job post by author
export async function jobPosts(parent, args, context, info) {
    console.log("Job Posts:::");
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
        console.log("Job Input::: ", args);
        const job = new Job({
            title: args.jobPostInput.title,
            description: args.jobPostInput.description,
            auther: args.jobPostInput.auther,
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
        const jobPost = await Job.findById(args.jobId).populate('author');
        return { ...jobPost._doc, _id: jobPost.id };
    } catch (err) {
        throw err;
    }
}

//resolver to update job post
export async function updateJobPost(parent, args, context, info) {
    try {
        const job = await Job.findById(args.jobId);
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

        return { ...result._doc, _id: result.id };
    } catch (err) {
        throw err;
    }
}

//delete job post by id
export async function deleteJobPost(parent, args, context, info) {
    try {
        const job = await Job.findById(args.jobId);
        if (!job) {
            throw new Error('Job not found');
        }
        await Job.findByIdAndDelete(args.jobId);
        return { ...job._doc, _id: job.id };
    } catch (err) {
        throw err;
    }
}
