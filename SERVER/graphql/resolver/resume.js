import Resume from '../../models/resume.js';
import User from '../../models/user.js';
import { createWriteStream } from 'fs';

//resolver for uploading resume
export async function uploadResume(parent, args, context, info) {
    try {
        console.log('Uploading resume:', args);
        const user = await User.findOne({ email: args.userId });
        if (!user) {
            throw new Error('User not found');
        }
        // const file = await processUpload(args.file);
        
        // const resume = new Resume({
        //     user: user._id,
        //     filename: file.filename,
        //     mimetype: file.mimetype,
        //     path: file.path
        // });
        // const existingResume = await Resume.findOne({ user: user._id });
        // if (existingResume) {
        //     await Resume.findByIdAndDelete(existingResume._id);
        // }
        // const result = await resume.save();
        // return {
        //     ...result._doc,
        //     _id: result.id,
        //     user: User
        // };
    } catch (err) {
        throw err;
    }
}

//resolver for getting resume
export async function getResume(parent, args, context, info) {
    try {
        const user = await User.findOne({ email: args.userId });
        if (!user) {
            throw new Error('User not found');
        }
        const resume = await Resume.findOne({ user: user._id });
        if (!resume) {
            throw new Error('Resume not found');
        }
        return {
            ...resume._doc,
            _id: resume.id,
            user: User
        };
    } catch (err) {
        throw err;
    }
}


const storeUpload = async ({ stream, filename, mimetype }) => {
    const path = `${path.join(__dirname, '/public/resume')}/${filename}`;
    return new Promise((resolve, reject) =>
        stream
            .pipe(createWriteStream(path))
            .on('finish', () => resolve({ path, filename, mimetype }))
            .on('error', reject)
    );
};

const processUpload = async upload => {
    console.log('Processing upload:', upload);
    const { createReadStream, filename, mimetype, encoding } = await upload;
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype });
    return file;
};