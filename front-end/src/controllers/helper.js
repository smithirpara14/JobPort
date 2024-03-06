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
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
}

export const dateFormatted = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const day = newDate.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

