import React from 'react';
import "./Login.css";
import { LoginForm } from '../../components/components';

const Login = () => {
  return (
    <>
      <div className='login-container'>
        <LoginForm />
      </div>
    </>
  )
}

export default Login;