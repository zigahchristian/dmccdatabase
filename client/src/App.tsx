import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MemberContext } from "./contexts/MemberContext";
import { AuthContext } from "./contexts/AuthContext";
import AuthService from "./services/authService";
import MemberService from "./services/memberService";
import getError from "./helpers/getError";

// Components
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import AddMember from "./components/Member/AddMember";
import EditMember from "./components/Member/EditMember";
import ViewMember from "./components/Member/ViewMember";
import MakePayment from "./components/Payment/MakePayment";
import SearchMember from "./components/Search/Search";
import NotFound from "./components/NotFound/NotFound";
import BulkMemberUpload from "./components/Member/BulkMemberUpload";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import { isAuthenticated } from "./helpers/auth";
import PreviewAddMember from "./components/Member/PreviewAddMember";
import ProtectedRoute from "./components/Auth/ProtectRoute";
import secureLocalStorage from "react-secure-storage";

const App = () => {
  const { dispatch } = useContext(MemberContext);
  const { dispatch: authDispatch } = useContext(AuthContext);
  useEffect(() => {
    const fetchMembers = async () => {
      dispatch({ type: "FETCH REQUEST" });
      try {
        const dbdata = await MemberService.getAllMembers(); //await ProductService.getProductById(slug);
        dispatch({ type: "FETCH_SUCCESS", payload: dbdata });
        secureLocalStorage.setItem("members", dbdata);
      } catch (error) {
        dispatch({ type: "FETCH_FAILED", payload: getError(error) });
      }
    };
    const fetchAuthUser = async () => {
      authDispatch({ type: "FETCH REQUEST" });
      try {
        const authuser = await AuthService.getSession();
        secureLocalStorage.setItem("authUser", authuser);
        console.log(authuser);
        authDispatch({ type: "FETCH_SUCCESS", payload: authuser.authUser });
      } catch (error) {
        authDispatch({ type: "FETCH_FAILED", payload: getError(error) });
      }
    };
    fetchMembers();
    fetchAuthUser();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated()} />}>
          <Route element={<Layout />}>
            <Route path="/addmember" element={<AddMember />} />
            <Route path="/addbulkmembers" element={<BulkMemberUpload />} />
            <Route path="/previewaddmember" element={<PreviewAddMember />} />
            <Route path="/viewmember/:id" element={<ViewMember />} />
            <Route path="/editmember/:id" element={<EditMember />} />
            <Route path="/makepayment/:id" element={<MakePayment />} />
            <Route path="/search" element={<SearchMember />} />
            <Route index={true} path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
