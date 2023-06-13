import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

import Sidebar from "@/components/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // const router = useRouter();
  // const { isLoading, session, error } = useSessionContext();

  // useEffect(() => {
  //   if (!isLoading && !session) router.push("/signin");
  //   if (session && router.pathname === "/signin") router.push("/dashboard");
  // }, [session, isLoading, router]);

  return (
    <div className="w-full h-[100vh] bg-white flex">
      <Sidebar />
      <div className="w-full pl-80">
      {children}
      </div>
    </div>
  );
}
