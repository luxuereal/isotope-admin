import { useSessionContext } from "@supabase/auth-helpers-react";
import Auth from "@/components/Auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/header";
import Layout from "@/components/layout";

const Home = () => {
  
  return (
    <Layout>
      <div className="w-full">
        <Header headers={[{ href: "", name: "Welcome Back!" }]} />
        <section className="w-full">{<Auth />}</section>
      </div>
    </Layout>
  );
};

export default Home;
