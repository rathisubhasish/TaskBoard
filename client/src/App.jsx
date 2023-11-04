import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Board, Login, Signup, Home } from './views/view';
import { UserContext } from "./UserContext";

import {getUser} from "./apis/apis";
import { Header, Loading } from './components/components';

function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    setUserLoading(true);
    const checkUser = getUser()
      .then((res) => {
        if (res.error){
          setUserLoading(false);
          console.error(res.error);
        }
        else{
          setUser(res.data.email);
          setUserId(res.data.user_id);
          console.log(user);
          setUserLoading(false);
        }
      })
      .catch((err) => {
        setUserLoading(false);
        console.error(err)
        }
      );
    return () => checkUser;
  }, []);

  return (
    <div className="App">

      
      <Router>
      <UserContext.Provider value={{ user, setUser, userId, setUserId}}>
      <ToastContainer />
      <Header />
        <Routes>
          <Route 
            exact
            path="/"
            element={
              <>
              {
                !user
                ?
                (<>
                  {userLoading ? <Loading loadType='blankLoad'/> : ''}
                  {!userLoading && <Home />}
                </>)
                :
                (<>
                  {userLoading ? <Loading loadType='screenLoad'/> : ''}
                  {!userLoading && <Board />}
                </>)
              }
              </>
            }
          />
          <Route 
            exact
            path="/login"
            element={
              <Login />
            }
          />
          <Route 
            exact
            path="/signup"
            element={
              <Signup />
            }
          />
          <Route 
            exact
            path='/taskboard'
            element={
              <>
                {
                  !user
                  ?
                  <>
                    <Login />
                  </>
                  :
                  <>
                    <Board />
                  </>
                }
              </>
            }
          />

        </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
