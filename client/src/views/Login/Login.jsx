import React , {useContext} from 'react';
import "./Login.css";
import { LoginForm } from '../../components/components';
import { NavLink } from 'react-router-dom';
import { UserContext } from "../../UserContext";

const Login = () => {
  const { user} = useContext(UserContext);

  return (
    <>
      
      <div className='login-container'>
        {
          !user
          ?
          <LoginForm />
          :
          <>
            <br />
          <h3>You are already logged in , go to <NavLink to='/'>Home</NavLink></h3>
          </>
        }
      </div>
    </>
  )
}

export default Login;