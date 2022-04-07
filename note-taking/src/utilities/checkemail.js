export const checkemail = (emailToCheck) => {
  const emailRegex = /^[a-zA-z0-9.-]+@[a-z0-9.-]+.[a-z]{2,8}$/;
  if (emailRegex.test(emailToCheck)) {
    return true;
  }
  return false;
};
