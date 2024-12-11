import React, { useEffect, useContext } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../Layout/Sidebar/AppSideBar";
import NavBar from "./NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { MemberContext } from "@/contexts/MemberContext";
import Loading from "../Loading/Loading";
import Logo from "../../assets/dmcc.png";

const Layout = () => {
  const { members } = useContext(MemberContext);
  console.log(members);
  if (members.length === 0) {
    console.log("Loading Members");
  } else {
    console.log("Members Loaded");
  }
  return members.length === 0 ? (
    <Loading logoUrl={Logo} />
  ) : (
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
