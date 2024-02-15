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
import Dashboard from "./Components/Admin/Dashboard";
import PocHome from "./Components/Poc/PocHome";
import HodDetails from "./Components/Poc/HodDetails";
import OneCollege from "./Components/student/OneCollege";
import DepartmentDetails from "./Components/Poc/DepartmentDetails";
import HodHome from "./Components/Hod/HodHome";
import ProjectDetails from "./Components/Hod/ProjectDetails";

import Image from "./Components/test/Image";
import Profile from "./Components/student/Profile";

function App() {
  return (
    <>
      <ContextProvider>
        <MantineProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/Login" element={<LoginForm />}></Route>
              <Route path="/SignUp" element={<SignUp />}></Route>
              <Route path="/image" element={<Image />}></Route>
              <Route path="/" element={<Home />}>
                <Route index element={<MainContent />} />
                <Route path="/home" element={<MainContent />} />
                <Route path="/college" element={<College />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/collage/:id" element={<OneCollege />} />
              </Route>
              <Route path="/Admin" element={<AdminHome />}>
                <Route path="/Admin/Dashboard" element={<Dashboard />}></Route>
                <Route
                  path="/Admin/CollegeDetails"
                  element={<CollegesTable />}
                ></Route>
                <Route path="/Admin/PocDetails" element={<PocTable />}></Route>
              </Route>
              <Route path="/Poc" element={<PocHome />}>
                {/* <Route path="/Poc/Dashboard" element={<PocDashboard />}></Route> */}
                <Route
                  path="/Poc/DepartmentDetails"
                  element={<DepartmentDetails />}
                ></Route>
                <Route
                  path="/Poc/HodDetails"
                  element={<HodDetails />}
                ></Route>
              </Route>
              <Route path="/Hod" element={<HodHome />}>
                {/* <Route path="/Poc/Dashboard" element={<PocDashboard />}></Route> */}
                <Route
                  path="/Hod/Projects"
                  element={<ProjectDetails />}
                ></Route>

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
