import axios from 'axios';
export const postLogin = async (email, password) => {
  try {
    const loginResponse = await axios.post('/api/auth/login', {
      email: email,
      password: password,
    });
    return loginResponse;
  } catch (e) {
    console.error(e);
    return e.response;
  }
};
