export const required = value => value ? undefined : 'Required';
export const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength15 = maxLength(15);
export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const minLength = min => value => value && value.length < min ? `Must be at least ${min}` : undefined;
export const minLength10 = minLength(10);
export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
