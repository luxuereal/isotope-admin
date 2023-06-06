import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function useAccess() {

  const router = useRouter();
  const { isLoading, session, error } = useSessionContext();
  
  useEffect(() => {
    if (!isLoading && !session) router.push("/");
  }, [isLoading, session]);
}