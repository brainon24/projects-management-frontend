import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home"
import { NotFound } from './pages/NotFound';

const App = () => {

  return (
    <>
      <MainLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Home /> } />

            <Route path="/*" element={ <NotFound /> } />
          </Routes>
        </BrowserRouter>
      </MainLayout>
    </>
  )
}

export default App
