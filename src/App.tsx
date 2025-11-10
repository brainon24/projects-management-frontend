import {useEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from "@reduxjs/toolkit";
import {checkingReducer, clearErrorReducer} from "./store/auth/authSlice";
import {checkToken_thunk, logout_thunk} from './store/auth/thunks';
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
import {Role} from "./enums/user-role.enum";
import ModalError from "./components/ModalError";
import { AllProjects } from './pages/AllProjects';
import { ManagementAccounts } from './pages/ManagementAccounts';
import { ManagementBusiness } from './pages/ManagementBusiness';
import { AdministrativeManagement } from './pages/AdministrativeManagement';
import { ProjectId } from './pages/ProjectId';
import { Messages } from "./pages/Messages";
import { HomePage } from "./pages/HomePage";
import { ServicePage } from "./pages/ServicePage";
import { ForgotPassword } from "./pages/forgot/ForgotPassword";
import { NewPassword } from "./pages/forgot/NewPassword/NewPassword";
import { ToastContainer } from "react-toastify";

const App = () => {

  const { status, errorMessage } = useSelector((state: any) => state.auth);
  const dispatch: Dispatch<any> = useDispatch();

  const location = useLocation();

  const checkToken = () => {
    dispatch( checkingReducer() );
    const token: string = localStorage.getItem('token')!;

    if( !token ) {
      return dispatch( logout_thunk() );
    }

    dispatch( checkToken_thunk( token ) );
  }

  useEffect((): any => {
      if(location.pathname.includes('/login') || location.pathname.includes('/sign-up')) {
        if(errorMessage === 'Se ha expirado tu sesión, por favor inicia sesión nuevamente.') {
          return dispatch(clearErrorReducer())
        }
      }

      checkToken();
  }, [location]);

  if( status === 'checking' ) return <Loading />


  return (
    <>
      {
        errorMessage ? (
            <ModalError
                title='Sesión expirada'
                descriptionError={ errorMessage }
            />
        ) : null
      }
      <Routes>
        <Route path="/" element={ <HomePage /> }  />
        <Route path="/login" element={ <Login /> } />
        <Route path="/sign-up" element={ <SignUp /> } />

        <Route path="/service/:id" element={ <ServicePage /> } />

        <Route path="/forgot-password" element={ <ForgotPassword /> } />
        <Route path="/forgot-password/:id" element={ <NewPassword /> } />

        <Route 
          path="/private" 
          element={ 
            <ProtectedRoute roles={[Role.USER, Role.CLIENT, Role.ALLY, Role.ADMIN]}>
              <Private />
            </ProtectedRoute>
         } 
        />

        <Route 
          path="/private/profile" 
          element={ 
            <ProtectedRoute roles={[Role.USER, Role.CLIENT, Role.ALLY, Role.ADMIN]}>
              <Profile />
            </ProtectedRoute>
         } 
        />

        <Route 
          path="/private/my-business" 
          element={ 
            <ProtectedRoute roles={[Role.USER, Role.CLIENT, Role.ALLY, Role.ADMIN]}>
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
          path="/private/messages" 
          element={ 
            <ProtectedRoute roles={[Role.ADMIN]}>
              <Messages />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/private/my-projects-asigned"
          element={ 
            <ProtectedRoute roles={[Role.ALLY, Role.ADMIN,]}>
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
          path="/private/project/:projectId"
          element={
              <ProtectedRoute roles={[Role.CLIENT, Role.ADMIN, Role.ALLY]}>
                <ProjectId />
              </ProtectedRoute>
          }
        />

        <Route
          path="/private/my-business-projects"
          element={
              <ProtectedRoute roles={[Role.CLIENT, Role.ALLY, Role.ADMIN]}>
                <MyBusinessProjects />
              </ProtectedRoute>
          }
        />

        <Route
          path="/private/all-projects"
          element={
              <ProtectedRoute roles={[Role.ADMIN]}>
                <AllProjects />
              </ProtectedRoute>
          }
        />

        <Route
          path="/private/management-accounts"
          element={
              <ProtectedRoute roles={[Role.ADMIN]}>
                <ManagementAccounts />
              </ProtectedRoute>
          }
        />

        <Route
          path="/private/management-business"
          element={
              <ProtectedRoute roles={[Role.ADMIN]}>
                <ManagementBusiness />
              </ProtectedRoute>
          }
        />

      <Route
          path="/private/administrative-managment"
          element={
              <ProtectedRoute roles={[Role.ADMIN]}>
                <AdministrativeManagement />
              </ProtectedRoute>
          }
        />

        <Route path="/*" element={ <NotFound /> } />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App
