"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Home = () => {
  const router = useRouter();
  useEffect(()=>{
    router.push('/signin')
  },[router])
  return (
    <></>
  );
};

export default Home;
