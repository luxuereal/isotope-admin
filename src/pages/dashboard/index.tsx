import { useEffect, useState } from "react";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import useParticipantStore from "@/store/use-participant";

import StatusNum from "@/components/statusNum";
import Summary from "@/components/summary";
import Header from "@/components/header";
import Layout from "@/components/layout";
import getUsers from "@/actions/getUsers";
import getPermiumUsers from "@/actions/getPremiumUsers";
import getOnlineUsers from "@/actions/getOnlineUsers";
import getGenderState from "@/actions/getGenderState";

const Home = () => {
  
  const [isloading, setLoading ] = useState(true);

  const {
    registerd_users,
    active_users,
    premium_users,
    online_users,
    users_state,
    gender_state,
    setRegisteredUsers,
    setActiveUsers,
    setOnlineUsers,
    setPremiumUsers,
    setUserState,
    setGenderState,
  } = useParticipantStore((state) => state);

  const session = useSession();

  useEffect(() => {
    (async () => {
      //Call actions and Skeleton true
      setLoading(true);
      let data = await getUsers();
      let premiumusers = await getPermiumUsers();
      let userdata = await getOnlineUsers();
      let genderstate = await getGenderState();
      
      //Set datas to components
      setRegisteredUsers(data.registered);
      setActiveUsers(data.active);
      setPremiumUsers(premiumusers);
      if (typeof userdata === 'object' && userdata !== null) 
      {
        setUserState(userdata.address);
        setOnlineUsers(userdata.is_online)
      }
      if (Array.isArray(genderstate)) setGenderState(genderstate);
      setLoading(false); //Skeleton false
    })();
  }, [setGenderState, setOnlineUsers, setPremiumUsers, setUserState,setRegisteredUsers, setActiveUsers, session]);

  return (
    <Layout>
      <div className="w-full">
        <Header headers={[{ href: "dashboard", name: "Dashboard" }]} />
        <section className="w-full p-8">
          <div className="grid grid-cols-4 gap-6">
            <StatusNum
              title="Number of registered users"
              value={registerd_users}
              isloading={isloading}
            />
            <StatusNum 
              title="Number of active users" 
              value={active_users} 
              isloading={isloading}
            />
            <StatusNum 
              title="Number of premium users" 
              value={premium_users} 
              isloading={isloading}
            />
            <StatusNum 
              title="Number of users online" 
              value={online_users} 
              isloading={isloading}
            />
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <Summary
              title="Summary of users state"
              data={users_state?.length ? users_state : []}
              color="#3576F4"
              isloading={isloading}
            />
            <Summary
              title="Summary of users state"
              data={gender_state}
              color="#FAC137"
              isloading={isloading}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
