import React, { useState, useContext } from 'react';
import "./FormCss/Form.css";
import { useNavigate } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import login from "../../apis/login";
import { UserContext } from '../../UserContext';



const LoginForm = () => {
    const { user, setUser, setUserId } = useContext(UserContext);
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const handleSubmission = async (e) => {
        window.scrollTo({top : 0, behavior: 'smooth'});
        try {
        const res = await login({email, password});
        if (res.error){
            toast.error(res.error, {
            autoClose: 4000,
            hideProgressBar: true,
            closeButton: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        else {
            toast.success(res.message, {
            autoClose: 1000,
            hideProgressBar: true,
            closeButton: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setUser(res.data.email);
            setUserId(res.data.user_id);
            navigate("/");
        }
        } catch (err) {
        toast.error("Server error, please try later!", {
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        }
      }
    

  return (
    <>
        <div className='form-container'>
            <div className='form-content'>
                <div className='form-header login-theme'>
                   <h3> Login </h3>
                </div>
                <div className='form-fields-container'>
                    <div className='form-fields'>
                        <input 
                            type="email" 
                            placeholder='email' 
                            className='form-input' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className='form-password-container'>
                            <input 
                                type={passwordVisibility ? "text" : "password"} 
                                placeholder='password' 
                                className='form-input'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className='eye-btn' onClick={()=>setPasswordVisibility(!passwordVisibility)}>
                                {
                                    passwordVisibility
                                    ?
                                    <>
                                        <i className="fa-solid fa-eye-slash"></i>
                                    </>
                                    :
                                    <>
                                        <i className="fa-solid fa-eye"></i>
                                    </>
                                }
                            </span>
                        </div>
                        {
                                !email ||
                                !password
                                ?
                                ''
                                :
                                <>
                                    <button 
                                        className='btn login-theme' 
                                        id="login-btn"
                                        onClick={handleSubmission}
                                    >
                                        Login
                                    </button>        
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
      </>
  )
}

export default LoginForm;