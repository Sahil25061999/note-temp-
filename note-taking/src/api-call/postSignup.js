import axios from 'axios';
export const postSignup = async (fullname, email, password) => {
  try {
    const signupResponse = await axios.post(`/api/auth/signup`, {
      name: fullname,
      email: email,
      password: password,
    });
    return signupResponse;
  } catch (e) {
    console.error(e);
    return e.response;
  }
};
