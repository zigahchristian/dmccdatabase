import classNames from "classnames";
import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import getTodaysBirthdays from "../../helpers/birthdayToday";
import { MemberContext } from "../../contexts/MemberContext";
import { isAuthenticated } from "../../helpers/auth";
import Loading from "../Loading/Loading";
import Logo from "../../assets/dmcc.png";
import { serverName } from "@/helpers/http-common";

const BirthdayChart: FC = () => {
  const { members } = useContext(MemberContext);
  const birthdaysToday = getTodaysBirthdays(members);
  let date = new Date();
  const currentYear = date.getFullYear();
  return isAuthenticated() ? (
    <div className="w-full h-[22rem] bg-white p-4 mr-0 rounded-sm border border-gray-200 flex flex-col overflow-y-auto">
      <strong className="text-gray-700 font-medium underline-offset-1">
        Birthdays Today
      </strong>
      <div className="mt-4 flex flex-col gap-3 item-center">
        {birthdaysToday.length === 0 ? (
          <h2>No Birthday Today</h2>
        ) : (
          birthdaysToday.map((birthday, index) => (
            <Link
              key={index}
              to={`/viewmember/${birthday.id}`}
              className="flex items-start hover:no-underline"
            >
              <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
                <img
                  className="w-full h-full object-cover rounded-sm"
                  src={`${serverName}static/${birthday?.avatar}`}
                  alt={birthday.firstname}
                />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm text-gray-800">
                  {birthday.firstname} {birthday.lastname}
                </p>
                <span
                  className={classNames(
                    birthday.age === 0
                      ? "text-red-500"
                      : birthday.age > 50
                      ? "text-green-500"
                      : "text-orange-500",
                    "text-xs font-medium"
                  )}
                >
                  {currentYear - parseInt(birthday?.yearOfBirth)}
                </span>
              </div>
              <div className="text-xs text-gray-400 pl-1.5">
                {birthday.yearOfBirth}
              </div>
              <hr />
            </Link>
          ))
        )}
      </div>
    </div>
  ) : (
    <Loading logoUrl={Logo} />
  );
};

export default BirthdayChart;
