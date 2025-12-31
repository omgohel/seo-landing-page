/**
 * Validates email format using a standard regex pattern
 * @param email - The email address to validate
 * @returns true if the email format is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

