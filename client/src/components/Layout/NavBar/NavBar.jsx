import Logo from "../../../assets/dmcc.png";
import avatar from "../../../assets/avatar.jpg";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AuthService from "../../../services/authService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNotification } from "../../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { authUser } = useContext(AuthContext);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await AuthService.logout();

    if (res === 200) {
      showNotification({
        message: "Successfully Logged out.",
        type: "success",
      });
      return (window.location.href = "/");
    }
    return showNotification({
      message: "Something Went Wrong.",
      type: "error",
    });
  };

  return (
    <div className="bg-primary text-white dark:bg-slate-700 py-2 px-5 flex justify-between">
      <div className="flex items-center">
        <SidebarTrigger className="text-white text-2xl" />
        <Link to="/">
          <img src={Logo} alt="Logo" width="40" />
        </Link>
      </div>

      <DropdownMenu className="focus:outline-none">
        <DropdownMenuTrigger>
          {" "}
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <h3>Welcome, {authUser.username}</h3>
          </DropdownMenuItem>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button onClick={handleLogout}>Logout</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavBar;
