import Job from '../../models/job.js';
import User from '../../models/user.js';
import Application from '../../models/application.js';

//resolver to get recruiter summary
export async function recruiterSummary(parent, args, context, info) {
    try {
        const user = await User.findOne({ email: args.userId });
        if (!user) {
            throw new Error('User with the provided email not found');
        }
        const jobPosts = await Job.find({ author: user._id }).populate('author');
        const totalJobPosts = jobPosts.length;
        const jobPostIds = jobPosts.map(jobPost => jobPost._id);
        const applications = await Application.find({ jobPost: { $in: jobPostIds } });
        const totalApplications = applications.length;
        const activeJobPosts = jobPosts.filter(jobPost => jobPost.closingDate >= new Date()).length;
        const closedJobPosts = jobPosts.filter(jobPost => jobPost.closingDate < new Date()).length;
        const todayJobPosts = jobPosts.filter(jobPost => {
            return jobPost.creationDate.toDateString() === new Date().toDateString()
        }).length;
        const todayApplications = applications.filter(application => application.applicationDate.toDateString() === new Date().toDateString()).length;
        return {
            totalJobPosts: totalJobPosts,
            totalApplications: totalApplications,
            activeJobPosts,
            closedJobPosts,
            todayJobPosts,
            todayApplications
        };
    } catch (err) {
        throw err;
    }
}
