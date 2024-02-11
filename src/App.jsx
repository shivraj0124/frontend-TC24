import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { ContextProvider } from "../src/Components/Context";
import LoginForm from "./Components/Login/Login";
import SignUp from "./Components/SignUp";
import Sidebar from "./Components/Admin/Sidebar";
function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Sidebar />}></Route>
            <Route path="/Login" element={<LoginForm />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
          </Routes>
        </BrowserRouter>
        <Toaster/>
      </ContextProvider>
    </>
  );
}

export default App;
