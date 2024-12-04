import React, {useContext, useEffect} from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../Layout/Sidebar/AppSideBar";
import NavBar from "./NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { MemberContext } from "../../contexts/MemberContext";
import http from "../../helpers/http-common"
import getError from "../../helpers/getError";
import { AuthContext } from "../../contexts/AuthContext";
import AuthService from "../../services/authService";

const Layout = () => {
  const { dispatch } = useContext(MemberContext);
  const { dispatch: authDispatch } = useContext(AuthContext)
  useEffect(() => {
    const fetchMembers = async () => {
      dispatch({ type: "FETCH REQUEST" });
      try {
        const dbdata = await http.get(`/members`) //await ProductService.getProductById(slug);
        dispatch({ type: "FETCH_SUCCESS", payload: dbdata.data });
      } catch (error: any) {
        dispatch({ type: "FETCH_FAILED", payload: getError(error) });
      }
    };   
    const fetchAuthUser =  async () => {
      authDispatch({ type: "FETCH REQUEST" });
      try {
        const authuser = await AuthService.getSession() //await ProductService.getProductById(slug);
        authDispatch({ type: "FETCH_SUCCESS", payload: authuser.authUser });
      } catch (error: any) {
        authDispatch({ type: "FETCH_FAILED", payload: getError(error) });
      }
    };
    fetchMembers()
    fetchAuthUser()      

  }, [])
  return (
    <SidebarProvider>
      <AppSidebar />  
      <main className="w-full">
        <NavBar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;


