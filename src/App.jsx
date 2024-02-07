import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "../src/Components/Context";
import LoginForm from "./Components/Login/Login";
import SignUp from "./Components/SignUp";
function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/Login" element={<LoginForm />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
