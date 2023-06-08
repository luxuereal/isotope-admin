import {
  useSessionContext,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Profile from "@/components/profile";
import { Database } from "@/utils/database.types";
import useAccess from "@/utils/useAccess";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

const Dashboard = () => {
  useAccess();

  const supabase = useSupabaseClient<Database>();
  const router = useRouter();

  const [profile, setProfile] = useState<Profiles | any>();
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    if (router.query.uid) {
      fetchProfile(router.query.uid);
    }
  }, [router.query]);

  const fetchProfile = async (uid: string | any) => {
    try {
      setLoading(true);
      let calAge = (pro: Profile | any) => {
        let thisYear = new Date().getFullYear();
        if (pro.birthday) {
          return thisYear - new Date(pro.birthday).getFullYear();
        } else {
          return null
        }
      }

      let user = await supabase
        .from("profiles")
        .select()
        .eq('uid', uid);

      let userProfile = await supabase
        .from("profiles")
        .select()
        .eq('uid', uid);

      if (!user.error && !userProfile.error) {
        let created = new Date(userProfile.data[0].created_at);
        setProfile({...userProfile.data[0], 
          lname: null,
          age: calAge(userProfile.data[0]),
          city: null,
          state: null,
          country: null,
          up_date: created.toLocaleDateString(),
          up_time: created.toLocaleTimeString(), 
          in_date: created.toLocaleDateString(),
          in_time: created.toLocaleTimeString(), 
          status: user.data[0].is_disabled,
          phone_number: user.data[0].phone_number, 
          email: user.data[0].email,
          reported: false,
          stories: null,
          dating_fr: null
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-[100vh] bg-white flex">
      <Sidebar />
      <div className="w-full ml-80">
        <Header headers={[{ href: "/usermanage", name: "User Management" }, { href: "", name: "User Profile" }]} />
        <section className="w-full p-8">
          {
            loading 
              ? "Loading"            
              :<Profile profile={profile} />
          }
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
