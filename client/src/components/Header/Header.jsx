import React, { useContext } from "react";
import "./Header.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from "../../UserContext";
import { toast, Flip } from "react-toastify";

import logout from "../../apis/logout";


const Header = () => {
    const { user, setUser, setUserId } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res.error) toast.error(res.error, {
                autoClose: 2000,
                hideProgressBar: true,
                closeButton: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Flip
            });
            else {
                toast.success(res.message, {
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition: Flip
                });
                setUser(null);
                setUserId(null);
                navigate("/login");
            }
        } catch (err) {
            toast.error(err, {
                autoClose: 2000,
                hideProgressBar: true,
                closeButton: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Flip
            });
        }
    }

    return (
        <>
            <div className='header-container'>
                <div className='heading-area'>
                    {
                        !user
                            ?
                            <>
                                <NavLink to="/" >
                                    TaskBoard
                                </NavLink>
                            </>
                            :
                            <>
                                {`Welcome ${user}`}
                            </>
                    }

                </div>
                <div className='nav-actions'>
                    <ul className='nav-area'>
                        {
                            !user
                                ?
                                <>
                                    <li className='nav-btn'>
                                        <NavLink to="/login" className="nav-btn" id="login-nav-btn">
                                            Login
                                        </NavLink>
                                    </li>
                                    <li className='nav-btn'>
                                        <NavLink to="/signup" className="nav-btn" id="signup-nav-btn">
                                            Signup
                                        </NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li className='nav-btn' id="signup-nav-btn" onClick={handleLogout}>
                                        Logout
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header;