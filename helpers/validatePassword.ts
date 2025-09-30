export const validatePassword = (password: string) => {
  const errors: string[] = [];
  if (password.length < 8) errors.push("Must be at least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("Must include an uppercase letter");
  if (!/[0-9]/.test(password)) errors.push("Must include a number");
  return errors;
};