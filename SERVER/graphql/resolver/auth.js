import bcrypt from 'bcryptjs';
import User from '../../models/user.js';
import AccountType from '../../models/accounttype.js';
import jwt from 'jsonwebtoken';
import { stripe } from './index.js';

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

        const { email } = args;
        console.log("Email::: ", args);
        const user = await User.find({ email }).populate('accountType');
        console.log("User::: ", user);
        if (user.length === 0) {
            log.error("User not found");
            throw new Error('User not found');
        }
        return {
            ...user[0]._doc,
            _id: user[0].id,
            password: null
        };
    } catch (err) {
        console.error("Error fetching user:", err);
        throw err;
    }
}

export async function updateUser(parent, args, context, info) {
    //updateUser(userId: ID!, userInput: UserInput): User
    try {
        const { userId, userInput } = args;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            userInput,
            { new: true }
        );
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return {
            ...updatedUser._doc,
            _id: updatedUser.id,
            password: null
        };
    } catch (err) {
        console.error("Error updating user:", err);
        throw err;
    }
}

export async function updateUserPersonalInfo(parent, args, context, info) {
    try {
        const { userPersonalInfo } = args;
        const { userId } = context;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            userPersonalInfo,
            { new: true }
        );
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return {
            ...updatedUser._doc,
            _id: updatedUser.id,
            password: null
        };
    } catch (err) {
        console.error("Error updating user:", err);
        throw err;
    }
}


export async function deleteUser(parent, args, context, info) {
    try {
        const { userId } = args;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error('User not found');
        }
        return {
            ...deletedUser._doc,
            _id: deletedUser.id,
            password: null
        };
    } catch (err) {
        console.error("Error deleting user:", err);
        throw err;
    }
}

export async function createAccountType(parent, args, context, info) {
    try {
        const { name, description } = args;
        const existingAccountType = await AccountType.findOne({ name });
        if (existingAccountType) {
            throw new Error('Account type already exists.');
        }
        const newAccountType = new AccountType({
            name,
            description
        });
        const result = await newAccountType.save();
        return { ...result._doc, _id: result.id };
    } catch (err) {
        console.error("Error creating account type:", err);
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

export async function accountType(parent, args, context, info) {
    try {
        const { accountTypeId } = args;
        const accountType = await AccountType.findById(accountTypeId);
        if (!accountType) {
            throw new Error('Account type not found');
        }
        return {
            ...accountType._doc,
            _id: accountType.id
        };
    } catch (err) {
        console.error("Error fetching account type:", err);
        throw err;
    }
}

export async function updateAccountType(parent, args, context, info) {
    try {
        const { accountTypeId, name, description } = args;
        const updatedAccountType = await AccountType.findByIdAndUpdate(
            accountTypeId,
            { name, description },
            { new: true }
        );
        if (!updatedAccountType) {
            throw new Error('Account type not found');
        }
        return {
            ...updatedAccountType._doc,
            _id: updatedAccountType.id
        };
    } catch (err) {
        console.error("Error updating account type:", err);
        throw err;
    }
}

export async function deleteAccountType(parent, args, context, info) {
    try {
        const { accountTypeId } = args;
        const deletedAccountType = await AccountType.findByIdAndDelete(accountTypeId);
        if (!deletedAccountType) {
            throw new Error('Account type not found');
        }
        return {
            ...deletedAccountType._doc,
            _id: deletedAccountType.id
        };
    } catch (err) {
        console.error("Error deleting account type:", err);
        throw err;
    }
}

export async function login(parent, { email, password }, context, info) {
    const user = await User.findOne({ email: email }).populate('accountType');
    console.log("User::: ", user);
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
    return { userId: user.email, token: token, tokenExpiration: 1, userRole: user.accountType.name };

}

//resolver for creating subscription
export async function createSubscription(parent, args, context, info) {
    try {
        const { userId, source, plan } = args;
        console.log("args: ", args);
        const user = await User.findOne({ email: userId });
        if (!user) {
            throw new Error('User not found');
        }
        let planId = null;

        if (plan == 'Monthly') {
            planId = 'price_1P48Ig01l6hWzQr1ew7xCdiO';
        }
        else if (plan == '6Months') {
            planId = 'price_1P48Ig01l6hWzQr1bGhdXug8';
        }
        else if (plan == 'Yearly') {
            planId = 'price_1P48Ig01l6hWzQr1uHjruIOS';
        }

        if (!planId) {
            throw new Error('Invalid plan');
        }

        const customer = await stripe.customers.create({
            email: user.email,
            source: source,
            plan: planId
        });

        user.stripeId = customer.id;
        user.subscriptionType = plan;
        await user.save();
        return { ...user._doc, _id: user.id };

    } catch (err) {
        console.error("Error creating subscription:", err);
        throw err;
    }
}

//resolver for fetching user subscription
export async function getSubscription(parent, args, context, info) {
    try {
        const { userId } = args;
        const user = await User.findOne({ email: userId });
        if (!user) {
            throw new Error('User not found');
        }
        //return subscription details if customer is empty
        if (!user.stripeId) {
            return {
                stripeId: user.stripeId,
                subscriptionType: user.subscriptionType,
                expirationDate: null,
                nextPaymentDate: null,
                nextPaymentAmount: 0,
                status: 'Cancelled/Expired'
            };
        }
        //fetch subscription details from stripe using stripeId from user and fetch subscription status

        const customer = await stripe.customers.retrieve(user.stripeId);
        console.log("Customer::: ", customer);



        const subscription = await stripe.subscriptions.list({ customer: customer.id });
        console.log("Subscription::: ", subscription);

        //return subscription details if subscription.data is not empty
        if (subscription.data.length === 0) {
            return {
                stripeId: user.stripeId,
                subscriptionType: user.subscriptionType,
                expirationDate: null,
                nextPaymentDate: null,
                nextPaymentAmount: 0,
                status: 'Cancelled/Expired'
            };
        } else {
            return {
                stripeId: user.stripeId,
                subscriptionType: user.subscriptionType,
                expirationDate: subscription.data[0].current_period_end ? new Date(subscription.data[0].current_period_end * 1000) : null,
                nextPaymentDate: subscription.data[0].current_period_end ? new Date(subscription.data[0].current_period_end * 1000) : null,
                nextPaymentAmount: subscription.data[0].plan.amount / 100,
                status: subscription.data[0].status
            };
        }

    }
    catch (err) {
        console.error("Error fetching user subscription:", err);
        throw err;
    }
}

//resolver for cancelling subscription
export async function cancelSubscription(parent, args, context, info) {
    try {
        const { userId } = args;
        const user = await User.findOne({ email: userId });
        if (!user) {
            throw new Error('User not found');
        }
        //fetch customer from stripe using stripeId from user
        const customer = await stripe.customers.retrieve(user.stripeId);
        console.log("Customer::: ", customer);
        //fetch subscription from stripe using customer id
        const subscription = await stripe.subscriptions.list({ customer: customer.id });
        console.log("Subscription::: ", subscription);
        //cancel subscription
        await stripe.subscriptions.cancel(subscription.data[0].id);
        //update user subscription details
        user.subscriptionType = 'Cancelled/Expired';
        await user.save();
        return { ...user._doc, _id: user.id };
    } catch (err) {
        console.error("Error cancelling subscription:", err);
        throw err;
    }
}


