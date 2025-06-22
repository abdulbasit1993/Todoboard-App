const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
export const validateEmail = (
  email: string,
): { isValid: boolean; isEmpty: boolean } => {
  const sanitizedEmail = email.trim().toLowerCase();

  if (!sanitizedEmail) {
    return { isValid: false, isEmpty: true };
  }
  if (!emailRegex.test(sanitizedEmail)) {
    return { isValid: false, isEmpty: false };
  }
  return { isValid: true, isEmpty: false };
};

export const validatePassword = (
  password: string,
): { isValid: boolean; isEmpty: boolean } => {
  const sanitizedPassword = password.trim();

  if (!sanitizedPassword) {
    return { isValid: false, isEmpty: true };
  }
  if (sanitizedPassword.length < 6) {
    return { isValid: false, isEmpty: false };
  }
  return { isValid: true, isEmpty: false };
};
