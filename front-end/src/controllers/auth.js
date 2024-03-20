// Function to retrieve token from localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Function to set token in localStorage
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

// Function to remove token from localStorage
export const removeToken = () => {
    localStorage.removeItem('token');
    if (localStorage.getItem('token') === null) {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        window.location.reload();
    }
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
    const token = getToken();
    return token !== null;
};

// Function to get user email
export const getUserEmail = () => {
    return localStorage.getItem('userEmail');
};

// Function to check if user is employer
export const isEmployer = () => {
    const role = localStorage.getItem('userRole');
    return role === 'Employer';
};

// Function to check if user is candidate
export const isCandidate = () => {
    const role = localStorage.getItem('userRole');
    return role === 'Job Seeker';
};

// Function to check if user is admin
export const isAdmin = () => {
    const role = localStorage.getItem('userRole');
    return role === 'Admin';
};
