import React, {useContext} from 'react';
import "./Signup.css";
import { SignupForm } from '../../components/components';
import { NavLink } from 'react-router-dom';
import { UserContext } from "../../UserContext";

const Signup = () => {
  const { user} = useContext(UserContext);
  return (
    <>
      <div className='signup-container'>
        {
          !user
          ?
          <SignupForm />
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

export default Signup;