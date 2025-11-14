import {useEffect, Suspense, lazy} from "react";
import {Route, Routes, useLocation} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from "@reduxjs/toolkit";
import {checkingReducer, clearErrorReducer} from "./store/auth/authSlice";
import {checkToken_thunk, logout_thunk} from './store/auth/thunks';
import {NotFound} from './pages/NotFound';
import {Login} from './pages/Login';
import {SignUp} from './pages/SignUp';
import Loading from "./components/Loading";
import {ProtectedRoute} from "./helpers/ProtectedRoute";
import {Role} from "./enums/user-role.enum";
import ModalError from "./components/ModalError";
import { HomePage } from "./pages/HomePage";
import { ServicePage } from "./pages/ServicePage";

// Lazy loading para páginas menos críticas
const Private = lazy(() => import('./pages/Private').then(module => ({ default: module.Private })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const MyBusiness = lazy(() => import('./pages/MyBusiness').then(module => ({ default: module.MyBusiness })));
const CreateProject = lazy(() => import('./pages/CreateProject').then(module => ({ default: module.CreateProject })));
const MyProjectsAsigned = lazy(() => import('./pages/MyProjectsAsigned').then(module => ({ default: module.MyProjectsAsigned })));
const MyProjects = lazy(() => import('./pages/MyProjects').then(module => ({ default: module.MyProjects })));
const MyBusinessProjects = lazy(() => import('./pages/MyBusinessProjects').then(module => ({ default: module.MyBusinessProjects })));
const AllProjects = lazy(() => import('./pages/AllProjects').then(module => ({ default: module.AllProjects })));
const ManagementAccounts = lazy(() => import('./pages/ManagementAccounts').then(module => ({ default: module.ManagementAccounts })));
const ManagementBusiness = lazy(() => import('./pages/ManagementBusiness').then(module => ({ default: module.ManagementBusiness })));
const AdministrativeManagement = lazy(() => import('./pages/AdministrativeManagement').then(module => ({ default: module.AdministrativeManagement })));
const ProjectId = lazy(() => import('./pages/ProjectId').then(module => ({ default: module.ProjectId })));
const Messages = lazy(() => import('./pages/Messages').then(module => ({ default: module.Messages })));
import { ForgotPassword } from "./pages/forgot/ForgotPassword";
import { NewPassword } from "./pages/forgot/NewPassword/NewPassword";
import { ToastContainer } from "react-toastify";
import { initGA, logPageView } from "./analytics";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return null;
}

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

  useEffect(() => {
    initGA();
  }, []);

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
      <AnalyticsTracker />
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
              <Suspense fallback={<Loading />}>
                <Private />
              </Suspense>
            </ProtectedRoute>
         } 
        />

        <Route 
          path="/private/profile" 
          element={ 
            <ProtectedRoute roles={[Role.USER, Role.CLIENT, Role.ALLY, Role.ADMIN]}>
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            </ProtectedRoute>
         } 
        />

        <Route 
          path="/private/my-business" 
          element={ 
            <ProtectedRoute roles={[Role.USER, Role.CLIENT, Role.ALLY, Role.ADMIN]}>
              <Suspense fallback={<Loading />}>
                <MyBusiness />
              </Suspense>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/private/create-project" 
          element={ 
            <ProtectedRoute roles={[Role.CLIENT, Role.ADMIN]}>
              <Suspense fallback={<Loading />}>
                <CreateProject />
              </Suspense>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/private/messages" 
          element={ 
            <ProtectedRoute roles={[Role.ADMIN]}>
              <Suspense fallback={<Loading />}>
                <Messages />
              </Suspense>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/private/my-projects-asigned"
          element={ 
            <ProtectedRoute roles={[Role.ALLY, Role.ADMIN,]}>
              <Suspense fallback={<Loading />}>
                <MyProjectsAsigned />
              </Suspense>
            </ProtectedRoute>
          } 
        />

        <Route
          path="/private/my-projects"
          element={
              <ProtectedRoute roles={[Role.CLIENT, Role.ADMIN]}>
                <Suspense fallback={<Loading />}>
                  <MyProjects />
                </Suspense>
              </ProtectedRoute>
          }
        />

        <Route
          path="/private/project/:projectId"
          element={
              <ProtectedRoute roles={[Role.CLIENT, Role.ADMIN, Role.ALLY]}>
                <Suspense fallback={<Loading />}>
                  <ProjectId />
                </Suspense>
              </ProtectedRoute>
          }
        />

        <Route
          path="/private/my-business-projects"
          element={
              <ProtectedRoute roles={[Role.CLIENT, Role.ALLY, Role.ADMIN]}>
                <Suspense fallback={<Loading />}>
                  <MyBusinessProjects />
                </Suspense>
              </ProtectedRoute>
          }
        />

        <Route
          path="/private/all-projects"
          element={
              <ProtectedRoute roles={[Role.ADMIN]}>
                <Suspense fallback={<Loading />}>
                  <AllProjects />
                </Suspense>
              </ProtectedRoute>
          }
        />

        <Route
          path="/private/management-accounts"
          element={
              <ProtectedRoute roles={[Role.ADMIN]}>
                <Suspense fallback={<Loading />}>
                  <ManagementAccounts />
                </Suspense>
              </ProtectedRoute>
          }
        />

        <Route
          path="/private/management-business"
          element={
              <ProtectedRoute roles={[Role.ADMIN]}>
                <Suspense fallback={<Loading />}>
                  <ManagementBusiness />
                </Suspense>
              </ProtectedRoute>
          }
        />

      <Route
          path="/private/administrative-managment"
          element={
              <ProtectedRoute roles={[Role.ADMIN]}>
                <Suspense fallback={<Loading />}>
                  <AdministrativeManagement />
                </Suspense>
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
