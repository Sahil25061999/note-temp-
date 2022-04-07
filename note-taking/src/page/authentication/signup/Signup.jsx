import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postSignup } from '../../../api-call/api-index';
import '../Authentication.css';
import { useToken } from '../../../context/context-index';
import { checkemail, checkpassword } from '../../../utilities/utilities-index';
import { useError } from '../../../reducer/useError';
export const Signup = () => {
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { setToken } = useToken();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [error, errorDispatch] = useError();

  const { emailError, passwordError, confirmPasswordError } = error;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmail = (e) => {
    if (checkemail(e.target.value)) {
      setUser({ ...user, email: e.target.value });
      errorDispatch({ type: 'EMAIL_ERROR', payload: '' });
      return;
    }
    errorDispatch({ type: 'EMAIL_ERROR', payload: 'Input valid email' });
    setUser({ ...user, email: '' });
  };

  const handlePassword = (e) => {
    if (checkpassword(e.target.value)) {
      setUser({ ...user, password: e.target.value });
      errorDispatch({ type: 'PASSWORD_ERROR', payload: '' });
      return;
    }
    errorDispatch({ type: 'PASSWORD_ERROR', payload: 'Input valid password' });
    setUser({ ...user, password: '' });
  };

  const handleConfirmPassword = (e) => {
    if (e.target.value === user.password) {
      setUser({ ...user, confirmPassword: e.target.value });
      errorDispatch({ type: 'CONFIRM_PASSWORD_ERROR', payload: '' });
      return;
    }

    errorDispatch({
      type: 'CONFIRM_PASSWORD_ERROR',
      payload: "Password don't match",
    });
    setUser({ ...user, confirmPassword: '' });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      user.fullname.length === 0 ||
      user.email.length === 0 ||
      user.password.length === 0 ||
      user.confirmPassword.length === 0
    ) {
      return;
    }
    const response = await postSignup(user.fullname, user.email, user.password);
    if (response.status === 201) {
      localStorage.setItem('token', response.data.encodedToken);
      setToken(localStorage.getItem('token'));
      navigate('/');
    }
  };
  return (
    <main className="authentication-body">
      <form action="" className="form-container signup-container">
        <h2 className="form-head text-center">Sign Up</h2>
        <div className="form-inputs">
          <div className="input-container">
            <label htmlFor="fullname">Full Name</label>
            <input
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              id="fullname"
              className="textbox"
              type="text"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">
              Email<span className="error-msg"> {emailError}</span>
            </label>
            <input
              onChange={handleEmail}
              id="email"
              className="textbox"
              type="email"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">
              Password<span className="error-msg"> {passwordError}</span>
            </label>
            <input
              onChange={handlePassword}
              id="password"
              className="textbox"
              type={showPassword ? 'text' : 'password'}
              required
            />
            <span
              onClick={handleShowPassword}
              className={`fa-solid ${
                showPassword ? 'fa-eye' : 'fa-eye-slash'
              } password-eye-icon`}
            ></span>
          </div>
          <div className="input-container">
            <label htmlFor="confirm-password">
              Confirm Password{' '}
              <span className="error-msg">{confirmPasswordError}</span>
            </label>
            <input
              id="confirm-password"
              className="textbox"
              type="password"
              onChange={handleConfirmPassword}
            />
            <span className="fa-solid fa-eye password-eye-icon confirm-password-eye"></span>
          </div>
          <div className="input-container remember-me-container">
            <div>
              <label htmlFor="remember-me">
                <input type="checkbox" id="remember-me" />
                Remember me
              </label>
            </div>
          </div>
          <button
            className="btn btn-primary form-sign-up-btn"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <p className="small-text terms-condition">
            By signing up you agree to our{' '}
            <span className="secondary-text-color term-condtn-link">
              terms and conditions
            </span>
          </p>
          <p className="form-or-text">
            <span className="line"></span>Or<span className="line"></span>
          </p>

          <div className="form-default-mail-container">
            <button className="btn btn-with-icon google-btn btn-black">
              <span>
                <span className="fa-brands fa-google btn-icon"></span> Sign up
                using google
              </span>
            </button>
          </div>
          <p className="small-text have-account-condition text-center muted-text-color">
            Already have an account ? <span> </span>
            <Link to="/login" className="secondary-text-color form-login-link">
              Login
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};
