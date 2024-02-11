import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { ContextProvider } from "../src/Components/Context";
import LoginForm from "./Components/Login/Login";
import SignUp from "./Components/SignUp";
import Sidebar from "./Components/Admin/Sidebar";
import Home from './Components/student/Home';
import MainContent from "./Components/student/MainContent";
import College from "./Components/student/College";
function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/hvgc" element={<Sidebar />}></Route>
            <Route path="/Login" element={<LoginForm />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/" element={<Home />}>
              <Route index element={<MainContent />} />
              <Route path='/home' element={<MainContent />} />
              <Route path='/college' element={<College />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ContextProvider>
    </>
  );
}

export default App;
