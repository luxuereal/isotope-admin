import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/layout";
import Header from "@/components/header";
import Profile from "@/components/profile";
import ProfileSkeleton from "@/components/profileSkeleton";
import eachProfile from "@/actions/usermanage/eachProfile";
import { xprofile } from "@/types/profile.type";

const Dashboard = () => {

  const router = useRouter();

  const [profile, setProfile] = useState<xprofile | any>();
  const [loading, setLoading] = useState<boolean>(true);

  const getData = useCallback( async () => {
    if (router.query.uid && typeof router.query.uid === 'string') {
      setLoading(true);
      let data = await eachProfile(router.query.uid);
      setProfile(data);
      setLoading(false);
    }
  }, [router.query])

  useEffect(() => {
    getData()
  }, [getData]);

  return (
    <Layout>
      <Header headers={[{ href: "/usermanage", name: "User Management" }, { href: "", name: "User Profile" }]} />
      <section className="w-full p-8">
        {
          loading 
            ? <ProfileSkeleton />            
            :<Profile profile={profile} />
        }
      </section>
    </Layout>
  );
};

export default Dashboard;
