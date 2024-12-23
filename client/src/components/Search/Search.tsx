import React, { useState, useContext } from "react";
import { Search } from "lucide-react";
import { MemberContext } from "../../contexts/MemberContext";
import { Link } from "react-router-dom";
import { serverName } from "@/helpers/http-common";

import getSearchResult from "../../helpers/searchResult";

const SearchMember = () => {
  const [query, setQuery] = useState("");
  const { members } = useContext(MemberContext);

  const searchArray = getSearchResult(members, query);
  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-4xl mx-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Find Users</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by ID, First Name or Last Name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {searchArray.length === 0 || searchArray.length === "NaN" ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No member(s) found matching your search query.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="underline flex flex-col items-center justify-center mt-4 my-4 font-medium text-[1.2rem]">
              Search Result of Members in Database
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  {searchArray.map((member, index) => (
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
                              {member.firstname} {member.lastname}{" "}
                              {member.othernames}
                            </div>
                            <div className="text-sm text-gray-500">
                              {member.memberid}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <div>
                          <div className="text-sm text-gray-500">
                            {member.phonenumber1} / {member.phonenumber2}
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.email}
                          </div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMember;
