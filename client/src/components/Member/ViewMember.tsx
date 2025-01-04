import React, { useContext, useEffect } from "react";
import MemberCard from "./MemberCard";
import { useParams } from "react-router-dom";
import { CurrentMemberContext } from "@/contexts/CurrentMemberContext";
import secureLocalStorage from "react-secure-storage";
import MemberService from "@/services/memberService";

const ViewMember: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const { currentmember } = useContext(CurrentMemberContext);
  const { dispatch } = useContext(CurrentMemberContext);

  useEffect(() => {
    const fetchMember = async () => {
      dispatch({ type: "FETCH REQUEST" });
      try {
        const dbdata = await MemberService.getMemberById(id);
        dispatch({ type: "FETCH_SUCCESS", payload: dbdata });
        secureLocalStorage.setItem("currentmember", dbdata);
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_FAILED", payload: error });
      }
    };
    fetchMember();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {currentmember.length === 0 ? (
        <div>Fetcting Member ........</div>
      ) : (
        <MemberCard user={currentmember} />
      )}
    </div>
  );
};

export default ViewMember;
