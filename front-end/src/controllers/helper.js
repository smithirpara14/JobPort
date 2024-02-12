export const validateName = (name) => {
    // Name validation regex
    var regex = /^[a-zA-Z]+$/;
    return regex.test(name);
}

export const validateEmail = (email) => {
    // Email validation regex
    var regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    return regex.test(email);
}

export const validatePassword = (password) => {
    // Minimum eight characters, at least one letter and one number
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
}

