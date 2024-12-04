import React, {useContext} from "react";
import DashboardCards from "./DashboardCards";
import DayBornChart from "./DayBornChart";
import MembershipChart from "./MembershipChart";
import BirthdayChart from "./BirthdayChart";
import MembersTable from "./MembersTable";
import calculateDaysBorn from "../../helpers/countDayBorn";
import { MemberContext } from "../../contexts/MemberContext";


const Dashboard = () => {
  const { members } = useContext(MemberContext);
  const data = calculateDaysBorn(members);
  return (
    <div className="m-4">
      <DashboardCards />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mt-4">
        <DayBornChart data={data} />
        <MembershipChart />
        <BirthdayChart />
      </div>
      <div className="flex flex-row w-full mt-4">
        <MembersTable />
      </div>
    </div>
  );
};

export default Dashboard;
