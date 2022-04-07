export const checkpassword = (passwordToCheck) => {
  const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;
  if (passwordRegex.test(passwordToCheck)) {
    return true;
  }
  return false;
};
