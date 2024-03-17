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
        window.location.reload();
    }
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
    const token = getToken();
    return token !== null;
};