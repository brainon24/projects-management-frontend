import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from "@reduxjs/toolkit";
import {checkingReducer} from "./store/auth/authSlice";
import {checkToken_thunk, logout_thunk} from './store/auth/thunks';
import {Home} from "./pages/Home"
import {NotFound} from './pages/NotFound';
import {Login} from './pages/Login';
import {SignUp} from './pages/SignUp';
import {Private} from './pages/Private';
import Loading from "./components/Loading";
import {ProtectedRoute} from "./helpers/ProtectedRoute";
import {Profile} from "./pages/Profile";
import {MyBusiness} from "./pages/MyBusiness";
import {CreateProject} from "./pages/CreateProject";
import {MyProjectsAsigned} from "./pages/MyProjectsAsigned";
import {MyProjects} from "./pages/MyProjects";
import {MyBusinessProjects} from "./pages/MyBusinessProjects";
import {MyCommentaries} from "./pages/MyCommentaries";
import {Role} from "./enums/user-role.enum";

const App = () => {

  const { status } = useSelector((state: any) => state.auth);
  const dispatch: Dispatch<any> = useDispatch();

  const checkToken = () => {
    dispatch( checkingReducer() );
    const token: string = localStorage.getItem('token')!;

    if( !token ) {
      dispatch( logout_thunk() );
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
        <Route path="/" element={ <Home /> }  />
        <Route path="/login" element={ <Login /> } />
        <Route path="/sign-up" element={ <SignUp /> } />

        <Route 
          path="/private" 
          element={ 
            <ProtectedRoute roles={[Role.USER, Role.CLIENT, Role.EMPLOYEE, Role.ADMIN]}>
              <Private />
            </ProtectedRoute>
         } 
        />

        <Route 
          path="/private/profile" 
          element={ 
            <ProtectedRoute roles={[Role.USER, Role.CLIENT, Role.EMPLOYEE, Role.ADMIN]}>
              <Profile />
            </ProtectedRoute>
         } 
        />

        <Route 
          path="/private/my-business" 
          element={ 
            <ProtectedRoute roles={[Role.USER, Role.CLIENT, Role.EMPLOYEE, Role.ADMIN]}>
              <MyBusiness />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/private/create-project" 
          element={ 
            <ProtectedRoute roles={[Role.CLIENT, Role.ADMIN]}>
              <CreateProject />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/private/my-projects-asigned"
          element={ 
            <ProtectedRoute roles={[Role.EMPLOYEE, Role.ADMIN]}>
              <MyProjectsAsigned />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/private/my-projects"
          element={
              <ProtectedRoute roles={[Role.CLIENT, Role.ADMIN]}>
                <MyProjects />
              </ProtectedRoute>
          }
        />

        <Route
          path="/private/my-business-projects"
          element={
              <ProtectedRoute roles={[Role.CLIENT, Role.EMPLOYEE, Role.ADMIN]}>
                <MyBusinessProjects />
              </ProtectedRoute>
          }
        />

        <Route
          path="/private/my-commentaries"
          element={
              <ProtectedRoute roles={[Role.USER, Role.CLIENT, Role.EMPLOYEE, Role.ADMIN]}>
                <MyCommentaries />
              </ProtectedRoute>
          }
        />

        <Route path="/*" element={ <NotFound /> } />
      </Routes>
    </>
  );
}

export default App
