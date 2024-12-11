import React, { useContext } from "react";
import MemberCard from "./MemberCard";
import { useParams } from "react-router-dom";
import { MemberContext } from "@/contexts/MemberContext";

const ViewMember: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const { members } = useContext(MemberContext);
  console.log(members);
  const user = members.find((user) => user._id === id);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <MemberCard user={user} />
    </div>
  );
};

export default ViewMember;
