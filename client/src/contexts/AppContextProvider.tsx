import ContextReducer from "../helpers/ContextReducer";

import AuthProvider from "./AuthContext";
import MemberProvider from "./MemberContext";
import RegisterProvider from "./RegisterContext";
import { NotificationProvider } from "./NotificationContext";

const providers: any = [
  AuthProvider,
  MemberProvider,
  NotificationProvider,
  RegisterProvider,
];

const AppContextProvider = ContextReducer(...providers);

export default AppContextProvider;
