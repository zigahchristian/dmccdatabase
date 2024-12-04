import React from "react";
import MemberCard from "./MemberCard";
import { useParams } from "react-router-dom";
import members from "../../helpers/data/data.json";

const ViewMember: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const user = members.find((user) => user.id === Number(id));

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <MemberCard user={user} />
    </div>
  );
};

export default ViewMember;
