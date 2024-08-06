import { toast } from 'react-toastify';

interface InputValues {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export const validateForm = (values: InputValues) => {
    let errors: Record<string, string> = {};

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email)) {
        errors.email = "Invalid email address";
    }

    // Name validation
    if (values.firstName.length < 3) {
        errors.firstName = "First name must be at least 3 characters long";
    }
    if (values.lastName.length < 3) {
        errors.lastName = "Last name must be at least 3 characters long";
    }

    // Password validation
    if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }

    return errors;
};

export const validateLoginForm = (values: Partial<InputValues>) => {
    let errors: Record<string, string> = {};

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email as string)) {
        errors.email = "Invalid email address";
    }

    // Password validation
    if (!values.password || values.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }

    return errors;
};

// Function to show toast notifications
export const showToast = (message: string) => {
    toast.error(message);
};
