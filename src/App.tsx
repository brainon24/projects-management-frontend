import { useEffect } from "react";
import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { useSelector, useDispatch } from 'react-redux';
import { Private } from './pages/Private';
import Loading from "./components/Loading";
import { ProtectedRoute } from "./helpers/ProtectedRoute";
import { checkToken_thunk, logout_thunk } from './store/auth/thunks';
import { Dispatch } from "@reduxjs/toolkit";
import { checkingReducer } from "./store/auth/authSlice";

const App = () => {

  const { status } = useSelector((state: any) => state.auth);
  const dispatch: Dispatch<any> = useDispatch();

  const checkToken = () => {
    dispatch( checkingReducer() );
    const token: string = localStorage.getItem('token')!;

    if( !token ) {
      dispatch( logout_thunk() );
      // return dispatch( logout_thunk() );
    }
    
    dispatch( checkToken_thunk( token ) );
  }

  useEffect(() => {
      checkToken();
  }, []);

  if( status === 'checking' ) return <Loading />

  return (
    <> 
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/sign-up" element={ <SignUp /> } />

        <Route 
          path="/private" 
          element={ 
            <ProtectedRoute>
              <Private />
            </ProtectedRoute>
         } 
        />

        <Route path="/*" element={ <NotFound /> } />
      </Routes>
    </>
  )
}

export default App
