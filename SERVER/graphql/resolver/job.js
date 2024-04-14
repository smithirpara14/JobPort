import bcrypt from 'bcryptjs';
import Job from '../../models/job.js';
import User from '../../models/user.js';
import SavedJob from '../../models/savedJob.js';
import Application from '../../models/application.js';
import Resume from '../../models/resume.js';
import jwt from 'jsonwebtoken';
import { users } from './auth.js';

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

//resolver to get all active job posts 
export async function allJobPosts(parent, args, context, info) {
    try {

        const jobPosts = await Job.find({ closingDate: { $gte: new Date() } }).populate('author');
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

// resolver to get job post with applications for recruiter
export async function jobPostWithApplications(parent, args, context, info) {
    try {
        const jobPost = await Job.findById(args.jobPostId).populate('author');
        const applications = await Application.find({ job: jobPost._id }).populate('user');
        console.log("Applications::: ", applications);
        const users = applications.map(application => application.user);
        console.log("Users::: ", users);
        const resumes = await Resume.find({ user: { $in: users.map(user => user._id) } });
        console.log("Resumes::: ", resumes);
        const applicationsWithResume = applications.map(application => {
            const resume = resumes.find(resume => resume.user.toString() === application.user._id.toString());
            return {
                ...application._doc,
                _id: application.id,
                resume: resume ? { _id: resume.id, filename: resume.filename } : null
            };
        });

        return {
            jobPost: { ...jobPost._doc, _id: jobPost.id },
            applications: applicationsWithResume
        };
        

        // return {
        //     jobPost: { ...jobPost._doc, _id: jobPost.id },
        //     applications: applications.map(application => {
        //         return { ...application._doc, _id: application.id};
        //     })
        // };

    } catch (err) {
        throw err;
    }
}

//resolver to get job post by id with application or saved job
export async function jobPostWithApplication(parent, args, context, info) {
    try {
        const user = await User.findOne({ email: args.userId });
        console.log("User::: ", user);
        if (!user) {
            throw new Error('User not found');
        }
        const jobPost = await Job.findById(args.jobPostId);
        if (!jobPost) {
            throw new Error('Job post not found');
        }
        console.log("Job Post::: ", jobPost);
        const application = await Application.findOne({ user: user.id, job: jobPost.id });
        console.log("Application::: ", application);
        const savedJob = await SavedJob.findOne({ user: user.id, job: jobPost.id });
        return {
            jobPost: { ...jobPost._doc, _id: jobPost.id },
            application: application ? { ...application._doc, _id: application.id } : null,
            savedJob: savedJob ? { ...savedJob._doc, _id: savedJob.id } : null
        };
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

        //delete saved job and applications for the job post
        await SavedJob.deleteMany({ job: args.jobPostId });
        await Application.deleteMany({ job: args.jobPostId });

        return { ...job._doc, _id: job.id };
    } catch (err) {
        throw err;
    }
}

// Resolve to save job
export async function saveJob(parent, args, context, info) {
    try {
        const user = await User.findOne({ email: args.email });
        if (!user) {
            throw new Error('User not found');
        }

        const existingSavedJob = await SavedJob.findOne({
            user: user._id,
            job: args.jobPostId
        });
        if (existingSavedJob) {
            throw new Error('Job already saved by the user');
        }

        const job = await Job.findById(args.jobPostId);
        if (!job) {
            throw new Error('Job not found');
        }

        const savedJob = new SavedJob({
            user: user._id,
            job: job._id,
            savedDate: new Date()
        });

        const result = await savedJob.save();

        return {
            ...result._doc,
            _id: result.id,
            user: user,
            job: job
        };
    } catch (err) {
        console.error("Error saving job:", err);
        throw err;
    }
}

//resolver to get all saved jobs by email
export async function savedJobsByEmail(parent, args, context, info) {
    try {
        const user = await User.findOne({ email: args.email });
        if (!user) {
            throw new Error('User not found');
        }
        const savedJobs = await SavedJob.find({ user: user._id }).populate('job');
        return savedJobs.map(savedJob => ({
            ...savedJob._doc,
            _id: savedJob.id,
            user: user,
        }));
    } catch (err) {
        console.error("Error fetching saved jobs:", err);
        throw err;
    }
}

// Resolver function to remove a saved job based on the job ID
export async function removeSavedJob(parent, args, context, info) {
    try {
        const { savedJobId } = args;

        const savedJob = await SavedJob.findByIdAndDelete(savedJobId);

        if (!savedJob) {
            throw new Error('Saved job not found');
        }

        return {
            ...savedJob._doc,
            _id: savedJob.id
        };
    } catch (err) {
        console.error("Error removing saved job:", err);
        throw err;
    }
}

// resolver to get all job posts ( saved, applied, archived) by job seeker user
export async function savedAppliedJobsByUser(parent, args, context, info) {
    try {
        const user = await User.findOne({ email: args.userId });
        if (!user) {
            throw new Error('User not found');
        }

        const savedJobs = await SavedJob.find({ user: user._id }).populate('job');
        const applications = await Application.find({ user: user._id }).populate('job');

        return {
            savedJobs: savedJobs.map(savedJob => ({
                ...savedJob._doc,
                _id: savedJob.id,
                user: user,
            })),
            appliedJobs: applications.map(application => ({
                ...application._doc,
                _id: application.id,
                user: user,
            }))
        };

    } catch (err) {
        console.error("Error fetching saved jobs:", err);
        throw err;
    }
} 