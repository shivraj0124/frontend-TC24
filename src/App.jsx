import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "../src/Components/Context";
import { MantineProvider } from "@mantine/core";
import LoginForm from "./Components/Login/Login";
import SignUp from "./Components/SignUp";
import Sidebar from "./Components/Admin/Sidebar";
import Home from "./Components/student/Home";
import MainContent from "./Components/student/MainContent";
import College from "./Components/student/College";
import CollegesTable from "./Components/Admin/CollegesTable";
import PocTable from "./Components/Admin/PocTable";
import AdminHome from "./Components/Admin/AdminHome";
import OneCollege from "./Components/student/OneCollege";
function App() {
  return (
    <>
      <ContextProvider>
        <MantineProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/Admin" element={<AdminHome />}>
                <Route
                  path="/Admin/CollegeDetails"
                  element={<CollegesTable />}
                ></Route>
                <Route path="/Admin/PocDetails" element={<PocTable />}></Route>
              </Route>
              <Route path="/Login" element={<LoginForm />}></Route>
              <Route path="/SignUp" element={<SignUp />}></Route>
              <Route path="/" element={<Home />}>
                <Route index element={<MainContent />} />
                <Route path="/home" element={<MainContent />} />
                <Route path="/college" element={<College />} />
                <Route path="/profile" element={<MainContent />} />
                <Route path="/collage/:id" element={<OneCollege />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster />
        </MantineProvider>
      </ContextProvider>
    </>
  );
}

export default App;
