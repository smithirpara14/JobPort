const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const AccountType = require('../../models/accounttype');

module.exports = {
    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email });
            if (existingUser) {
                throw new Error('User exists already.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const accountType = await AccountType.findOne({ name: args.userInput.accountType });
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
                accountType: accountType
            });

            const result = await user.save();

            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },
    users: async function () {
        try {
            const users = await User.find();
            return users.map(user => {
                return { ...user._doc, _id: user.id, password: null };
            });
        } catch (err) {
            throw err;
        }
    },
    login: async ({ email, password }) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        return { userId: user.id };
    }
};