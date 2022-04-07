import React, { useReducer } from 'react';

const errorReducerFunc = (state, action) => {
  switch (action.type) {
    case 'EMAIL_ERROR':
      return { ...state, emailError: action.payload };
    case 'PASSWORD_ERROR':
      return { ...state, passwordError: action.payload };
    case 'CONFIRM_PASSWORD_ERROR':
      return { ...state, confirmPasswordError: action.payload };
    default:
      return { ...state };
  }
};

export const useError = () => {
  const [error, errorDispatch] = useReducer(errorReducerFunc, {
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });
  return [error, errorDispatch];
};
