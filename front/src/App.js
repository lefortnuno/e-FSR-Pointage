import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignInProtection from "./contexts/ptotections/signin.protection";
import LogOutProtection from "./contexts/ptotections/logout.protection";

import LogIn from "./pages/login/login";

import User from "./pages/users/user";
import SignIn from "./pages/signin/signin";
import Params from "./pages/params/params";
import UserDetails from "./pages/users/detail.user";

import Home from "./pages/home/home";
import Conge from "./pages/conges/conge";
import CongeDM from "./pages/conges/dm.conge";
import Employee from "./pages/employees/employee";
import Pointage from "./pages/pointages/pointage";
import PointageWeek from "./pages/pointages/weeks/weeks";
import PointageDesAbsent from "./pages/pointages/pointage.absent";
import Account from "./pages/users/view/account";
import Stats from "./pages/stats/stat";

import About from "./pages/about/about";
import PageNotFound from "./pages/404/page404";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} position={"bottom-right"} />
      <BrowserRouter>
        <Routes>
          <Route index element={<LogOutProtection Cmp={LogIn} />} />

          <Route path="/*" element={<SignInProtection Cmp={PageNotFound} />} />
          <Route path="about/" element={<SignInProtection Cmp={About} />} />

          <Route path="users/" element={<SignInProtection Cmp={User} />} />
          <Route path="newUser/" element={<SignInProtection Cmp={SignIn} />} />
          <Route
            path="params/:id"
            element={<SignInProtection Cmp={Params} />}
          />
          <Route
            path="aboutUser/:id"
            element={<SignInProtection Cmp={UserDetails} />}
          />

          <Route path="home/" element={<SignInProtection Cmp={Home} />} />
          <Route path="conges/" element={<SignInProtection Cmp={Conge} />} />
          <Route
            path="dmConges/"
            element={<SignInProtection Cmp={CongeDM} />}
          />
          <Route path="account/" element={<SignInProtection Cmp={Account} />} />
          <Route path="stats/" element={<SignInProtection Cmp={Stats} />} />
          <Route
            path="employees/"
            element={<SignInProtection Cmp={Employee} />}
          />
          <Route
            path="pointages/"
            element={<SignInProtection Cmp={Pointage} />}
          />
          <Route
            path="pointagesWeeks/"
            element={<SignInProtection Cmp={PointageWeek} />}
          />
          <Route
            path="absences/"
            element={<SignInProtection Cmp={PointageDesAbsent} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
