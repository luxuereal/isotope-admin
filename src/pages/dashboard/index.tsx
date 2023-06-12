import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import useParticipantStore from "@/store/use-participant";

import StatusNum from "@/components/statusNum";
import Summary from "@/components/summary";
import Header from "@/components/header";
import Layout from "@/components/layout";
import { useEffect } from "react";
import getUsers from "@/actions/getUsers";
import getPermiumUsers from "@/actions/getPremiumUsers";

const Home = () => {
  const data = [
    { name: "New York", value: 230 },
    { name: "Oregon", value: 80 },
    { name: "Texas", value: 50 },
    { name: "Ohio", value: 40 },
    { name: "Ohio", value: 40 },
  ];

  const data1 = [
    { name: "Female", value: 230 },
    { name: "Male", value: 80 },
    { name: "Non-binary", value: 50 },
  ];
  const {
    registerd_users,
    active_users,
    premium_users,
    online_users,
    setRegisteredUsers,
    setActiveUsers,
    setOnlineUsers,
    setPremiumUsers,
  } = useParticipantStore((state) => state);
  const session = useSession();
  useEffect(() => {
    (async () => {
      let data = await getUsers();
      setRegisteredUsers(data.registered);
      setActiveUsers(data.active);
      setPremiumUsers(await getPermiumUsers());
      // setRegisteredUsers()
    })();
  }, [setRegisteredUsers, setActiveUsers, session]);
  return (
    <Layout>
      <div className="w-full">
        <Header headers={[{ href: "dashboard", name: "Dashboard" }]} />
        <section className="w-full p-8">
          <div className="grid grid-cols-4 gap-6">
            <StatusNum
              title="Number of registered users"
              value={registerd_users}
            />
            <StatusNum title="Number of active users" value={active_users} />
            <StatusNum title="Number of premium users" value={premium_users} />
            <StatusNum title="Number of users online" value={online_users} />
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <Summary
              title="Summary of users state"
              data={data}
              color="#3576F4"
            />
            <Summary
              title="Summary of users state"
              data={data1}
              color="#FAC137"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
