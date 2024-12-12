import React, { useContext } from "react";
import MemberCard from "./MemberCard";
import { useParams } from "react-router-dom";
import { MemberContext } from "@/contexts/MemberContext";
import secureLocalStorage from "react-secure-storage";

const ViewMember: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const { members } = useContext(MemberContext);
  const user = members.find((user) => user._id === id);
  secureLocalStorage.setItem("currentMember", user);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <MemberCard user={user} />
    </div>
  );
};

export default ViewMember;
