import { ServerErrors } from "../authApi";

export type SignUpUserError = { 
    message: string, 
    fieldName: string 
}

export const handleError = (errors: ServerErrors): SignUpUserError => {
    const error = errors.errors.length > 0 ? errors.errors[0] : null;
    const message = error ? error.message : 'Unknown error';
    const fieldName = error.extensions.code === 'ERR_VALIDATION_ERROR' &&
        error.message.includes('email') ? 'email' : 
        error.message.includes('password') ? 'password' : undefined; 
    return {message, fieldName};
}