import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home"
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';

const App = () => {

  return (
    <>
      <MainLayout>
        {/* <BrowserRouter> */}

        {/* </BrowserRouter> */}
      </MainLayout>

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />

        <Route path="/*" element={ <NotFound /> } />
      </Routes>
    </>
  )
}

export default App
