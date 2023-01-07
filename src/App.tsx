import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home"
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { useSelector } from 'react-redux';
import { Private } from './pages/Private';
import Loading from "./components/Loading";
import { ProtectedRoute } from "./helpers/ProtectedRoute";

const App = () => {

  const { status } = useSelector((state: any) => state.auth);

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
