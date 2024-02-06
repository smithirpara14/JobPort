import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from './graphqlQueries';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const [createUser] = useMutation(CREATE_USER);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createUser({
                variables: {
                    userInput: {
                        firstName,
                        lastName,
                        email,
                        password,
                        birthDate,
                        accountType: 'Standard' // You may want to change this value based on user selection
                    }
                }
            });
            console.log('User created:', data.createUser);
            navigate('/login');
            // Optionally, you can handle successful registration here (e.g., show a success message)
        } catch (error) {
            console.error('Error creating user:', error);
            // Optionally, you can handle errors here (e.g., show an error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </label>
            <br />
            <label>
                Last Name:
                <input
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <br />
            <label>
                Birth Date:
                <input
                    type="date"
                    value={birthDate}
                    onChange={(event) => setBirthDate(event.target.value)}
                />
            </label>
            <br />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
