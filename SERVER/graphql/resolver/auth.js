import bcrypt from 'bcryptjs';
import User from '../../models/user.js';
import AccountType from '../../models/accounttype.js';
import jwt from 'jsonwebtoken';

export async function createUser(parent, args, context, info) {
    try {
        console.log("User Input::: ", args.userInput);
        const existingUser = await User.findOne({ email: args.userInput.email });
        if (existingUser) {
            throw new Error('User already exists. Please use a different email address.');
        }

        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        const accountType = await AccountType.findOne({ name: args.userInput.accountType });

        const user = new User({
            firstName: args.userInput.firstName,
            lastName: args.userInput.lastName,
            email: args.userInput.email,
            password: hashedPassword,
            birthDate: args.userInput.birthDate,
            accountType: accountType
        });

        const result = await user.save();

        return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
        throw err;
    }
}

export async function users(parent, args, context, info) {
    try {
        // if (context.isAuth === false) {
        //     throw new Error('User is not authenticated');
        // }
        
        // helps to fetch accountType. excluding will result in {accountType: null}
        const users = await User.find().populate('accountType');
        return users.map(user => {
            return { ...user._doc, _id: user.id, password: null };
        });
    } catch (err) {
        throw err;
    }
}

export async function user(parent, args, context, info) {
    try {
        const { userId } = args;
        const user = await User.findById(userId).populate('accountType');
        if (!user) {
            throw new Error('User not found');
        }
        return {
            ...user._doc,
            _id: user.id,
            password: null
        };
    } catch (err) {
        console.error("Error fetching user:", err);
        throw err;
    }
}

export async function accountTypes(parent, args, context, info) {
    try {
        const accountTypes = await AccountType.find();
        return accountTypes.map(accountType => {
            return { ...accountType._doc, _id: accountType.id };
        });
    } catch (err) {
        throw err;
    }
}

export async function login(parent, { email, password }, context, info) {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
        throw new Error('Password is incorrect!');
    }
    const token = jwt.sign({ userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return { userId: user.email, token: token, tokenExpiration: 1 };

}