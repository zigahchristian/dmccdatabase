import React, { useState, useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MemberContext } from "../../contexts/MemberContext";
import { serverName } from "@/helpers/http-common";

import { Badge } from "../ui/badge";

const MembersTable = () => {
  const { members } = useContext(MemberContext);
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(members.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentmembers = members.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="underline flex flex-col items-center justify-center mt-4 my-4 font-medium text-[1.2rem]">
        All Members Registered Members in Database
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody className="divide-y divide-gray-200">
            {currentmembers.map((member, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={`${serverName}static/${member?.avatar}`}
                      alt={member.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {member.firstname} {member.lastname} {member.othernames}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.phonenumber1}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  <div>
                    <div className="text-sm text-gray-500">
                      {member.landmark}
                    </div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                  </div>
                </td>
                <td className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  <div>
                    <div className="text-sm text-gray-500">
                      {member.occupation}
                    </div>
                    <div className="text-sm text-gray-500">
                      {member.placeofwork}
                    </div>
                  </div>
                </td>
                <td className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  <div className="flex flex-wrap gap-1">
                    {member.otherlanguages
                      .slice(0, 2)
                      .map((language, index) => (
                        <Badge
                          key={language}
                          variant="secondary"
                          className="text-xs"
                        >
                          {language}
                        </Badge>
                      ))}
                  </div>
                </td>
                <td className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 2).map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        member.active === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {member.active}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/viewmember/${member?._id}`}>
                    <button className="bg-[#02424240] hover:bg-blue-700 text-white font-bold py-2 px-4 text-sm rounded-md">
                      {" "}
                      View More Info
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, members.length)} of{" "}
            {members.length} members
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersTable;
