import { useEffect, useState } from "react";

import Header from "@/components/header";
import Layout from "@/components/layout";
import { LineChart } from "@/components/lineChart";
import TopLocations from "@/components/topLocations";
import TotalNum from "@/components/totalNum";
import useParticipantStore from "@/store/use-participant";
import getTotalSession from "@/actions/analytics/getTotalSession";
import getTotalVisitor from "@/actions/analytics/getTotalVisitor";
import getTimeSpent from "@/actions/analytics/getTimeSpent";
import getMonthlyView from "@/actions/analytics/getMonthlyView";
import GetUserState from "@/actions/analytics/getUserState";
import getTotalBounceRate from "@/actions/analytics/getBounceRate";
import { Skeleton } from "primereact/skeleton";

const Analytics = () => {
  //Store
  const {
    users_state,
    location_state,
    total_session,
    session_arr,
    visitor_arr,
    total_visitor,
    time_arr,
    monthly_arr,
    total_time,
    bounce_arr,
    bounce_rate,
    setUserState,
    setTotalSession,
    setSessionArray,
    setVisitorArray,
    setTotalVisitor,
    setTimeArray,
    setTotalTime,
    setMonthlyArray,
    setBounceArray,
    setBounceRate
  } = useParticipantStore((state) => state);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await GetUserState(location_state, setUserState);
      await getTotalSession(setTotalSession, setSessionArray);
      await getTotalVisitor(setVisitorArray, setTotalVisitor);
      await getTimeSpent(setTimeArray, setTotalTime);
      await getMonthlyView(setMonthlyArray);
      await getTotalBounceRate(setBounceArray,setBounceRate)
      setLoading(false);
    })();
  }, [location_state, setBounceArray, setBounceRate, setMonthlyArray, setSessionArray, setTimeArray, setTotalSession, setTotalTime, setTotalVisitor, setUserState, setVisitorArray]);

  return (
    <Layout>
      <div className="w-full">
        <Header headers={[{ href: "analytics", name: "Analytics" }]} />
        <section className="w-full px-8">
          Analytics
          <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
            <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-6">
              <TotalNum
                title="Total Sessions"
                value={total_session}
                data={session_arr}
                option={1}
                isLoading={isloading}
              />
              <TotalNum
                title="Total Visitors"
                value={total_visitor}
                data={visitor_arr}
                option={1}
                isLoading={isloading}
              />
              <TotalNum
                title="Time Spent"
                value={total_time}
                data={time_arr}
                option={1}
                isLoading={isloading}
              />
              <TotalNum
                title="Bounce Rate"
                value={bounce_rate}
                data={bounce_arr}
                option={1}
                isLoading={isloading}
              />
            </div>
            <TopLocations value={users_state} isLoading={isloading} />
          </div>
          <div className="grid xl:grid-cols-2 grid-cols-1 gap-6 mt-6">
            <div className="w-full min-h-[350px] border-border border-[1px] rounded-[10px] p-5">
              {!isloading ? <LineChart data={monthly_arr} option={2} /> : <Skeleton width="100%" height="350px"/>}
            </div>
            <div className="w-full"></div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Analytics;
