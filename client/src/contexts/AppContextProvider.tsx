import ContextReducer from "../helpers/ContextReducer";

import AuthProvider from "./AuthContext";
import MemberProvider from "./MemberContext";
import CurrentMemberProvider from "./CurrentMemberContext";
import CurrentDuesProvider from "./CurrentDuesContext";
import RegisterProvider from "./RegisterContext";
import { NotificationProvider } from "./NotificationContext";

const providers: any = [
  AuthProvider,
  MemberProvider,
  CurrentMemberProvider,
  CurrentDuesProvider,
  NotificationProvider,
  RegisterProvider,
];

const AppContextProvider = ContextReducer(...providers);

export default AppContextProvider;
