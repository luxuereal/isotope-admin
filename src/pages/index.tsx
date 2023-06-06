import { useSessionContext } from "@supabase/auth-helpers-react";
import Auth from "@/components/Auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

const Home = () => {
  const router = useRouter();
  const { isLoading, session, error } = useSessionContext();

  useEffect(() => {
    if (!isLoading && !session) router.push("/");
    if (session) router.push("/dashboard");
  }, [session, isLoading]);

  return (
    <div className="w-full h-[100vh] bg-white flex">
      <Sidebar />
      <div className="w-full">
        <Header headers={[{ href: "/", name: "Welcome Back 🎉" }]} />
        <section className="w-full">{!session ? <Auth /> : ""}</section>
      </div>
    </div>
  );
};

export default Home;
