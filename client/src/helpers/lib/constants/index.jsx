import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
  HiUserAdd,
  HiDocumentReport,
} from "react-icons/hi";

import { FaSearch, FaGoogleWallet } from "react-icons/fa";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 1,
    label: "Dashboard",
    path: "/dashboard",
    icon: <HiOutlineViewGrid size={24} />,
  },
  {
    key: 2,
    label: "Add A New Member",
    path: "/addmember",
    icon: <HiUserAdd size={24} />,
  },
  {
    key: 3,
    label: "Cash Payment",
    path: "/newdues",
    icon: <FaGoogleWallet size={24} />,
  },
  {
    key: 4,
    label: "Search A Member",
    path: "/searchmember",
    icon: <FaSearch />,
  },
  {
    key: 5,
    label: "View all Members",
    path: "/transactions",
    icon: <HiOutlineUsers size={24} />,
  },
  {
    key: 5,
    label: "Generate Report",
    path: "/transactions",
    icon: <HiDocumentReport size={24} />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: 7,
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: 8,
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
