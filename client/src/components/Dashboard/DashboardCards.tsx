import React, { FC, useContext } from "react";
import { IoPeople, IoCart } from "react-icons/io5";
import { IoIosMale, IoIosFemale, IoIosPeople } from "react-icons/io";

import countGender from "../../helpers/countGender";
import calculateYouthCount from "../../helpers/youthCount";

import { MemberContext } from "../../contexts/MemberContext";

const GridItem: FC = ({ children }) => {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
};

const DashboardGrids: FC = () => {
  const { members } = useContext(MemberContext);
  const { male, female } = countGender(members);
  const youthCount = calculateYouthCount(members);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <GridItem>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoIosMale className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Male</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {male}
            </strong>
            <span className="text-sm text-green-500 pl-2">
              {((male / members.length) * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </GridItem>
      <GridItem>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoIosFemale className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Female</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {female}
            </strong>
            <span className="text-sm text-green-500 pl-2">
              {((female / members.length) * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </GridItem>
      <GridItem>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Youth</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {youthCount}
            </strong>
            <span className="text-sm text-red-500 pl-2">
              {((youthCount / members.length) * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </GridItem>
      <GridItem>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoIosPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Membership
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {members.length}
            </strong>
            <span className="text-sm text-red-500 pl-2">%100</span>
          </div>
        </div>
      </GridItem>
    </div>
  );
};

export default DashboardGrids;
