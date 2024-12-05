import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import AddMember from "./components/Member/AddMember";
import EditMember from "./components/Member/EditMember";
import ViewMember from "./components/Member/ViewMember";
import MakePayment from "./components/Payment/MakePayment";
import SearchMember from "./components/Search/Search";
import NotFound from "./components/NotFound/NotFound";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import { isAuthenticated } from "./helpers/auth";
import PreviewAddMember from "./components/Member/PreviewAddMember";
import ProtectedRoute from "./components/Auth/ProtectRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated()} />}>
          <Route element={<Layout />}>
            <Route path="/addmember" element={<AddMember />} />
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
