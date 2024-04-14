import Resume from '../../models/resume.js';
import User from '../../models/user.js';
import { createWriteStream } from 'fs';
import path from 'path';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
//get db
const db = mongoose.connection;
import crypto from 'crypto';

const bucket = new GridFSBucket(db, {
    bucketName: 'resume'
});

//resolver for uploading resume
export async function uploadResume(parent, args, context, info) {
    try {
        console.log('Uploading resume:', args);
        const user = await User.findOne({ email: args.userId });
        if (!user) {
            throw new Error('User not found');
        }
        const { createReadStream, filename, mimetype, encoding } = await args.file;
        const stream = createReadStream();
        // Upload file to GridFS
        const uploadStream = bucket.openUploadStream(filename);
        const fileId = (await new Promise((resolve, reject) => {
            stream.pipe(uploadStream)
                .on('error', reject)
                .on('finish', () => resolve(uploadStream.id));
        })).toString();

        const resume = new Resume({
            user: user._id,
            filename: filename,
            mimetype: mimetype,
            fileId: fileId
        });

        const existingResume = await Resume.findOne({ user: user._id });
        console.log('Existing resume:', existingResume);
        if (existingResume) {
            await Resume.findByIdAndDelete(existingResume._id);
        }


        const result = await resume.save();
        return {
            filename: result.filename,
            mimetype: result.mimetype,
            fileId: result.fileId
        };
    } catch (err) {
        throw err;
    }
}

//resolver for fetching resume
export async function getResume(parent, args, context, info) {
    try {
        console.log('Fetching resume:', args);
        const user = await User.findOne({ email: args.userId });
        if (!user) {
            throw new Error('User not found');
        }
        const resume = await Resume.findOne({ user: user._id });
        if (!resume) {
            throw new Error('Resume not found');
        }
        return {
            _id: resume._id,
            filename: resume.filename
        };
    } catch (err) {
        throw err;
    }
}

//resolver for fetching resume file
export async function getResumeFile(parent, args, context, info) {
    try {
        console.log('Fetching resume file:', args);
        const user = await User.findOne({ email: args.userId });
        const resume = await Resume.findOne({ user: user._id });
        if (!resume) {
            throw new Error('Resume not found');
        }

        const file = bucket.openDownloadStream( new mongoose.Types.ObjectId(resume.fileId));

        // Convert file data to base64
        const data = await new Promise((resolve, reject) => {
            let chunks = [];
            file.on('data', (chunk) => {
                chunks.push(chunk);
            });
            file.on('end', () => {
                resolve(Buffer.concat(chunks).toString('base64'));
            });
            file.on('error', (err) => {
                console.error('Error reading file:', err);
                reject(err);
            });
        });
        return {
            filename: resume.filename,
            mimetype: 'application/pdf',
            data: data,
        };
    } catch (err) {
        throw err;
    }
}

//resolver for deleting resume
export async function deleteResume(parent, args, context, info) {
    try {
        console.log('Deleting resume:', args);
        const user = await User.findOne({ email: args.userId });
        const resume = await Resume.findOne({ user: user._id });
        if (!resume) {
            throw new Error('Resume not found');
        }
        await Resume.findByIdAndDelete(resume._id);
        return {
            _id: resume._id
        };
    } catch (err) {
        throw err;
    }
}




