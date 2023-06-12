import { useRef, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";


const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const supabase = useSupabaseClient();
  const toast = useRef<any>(null);
  const router = useRouter();

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      toast.current?.show({
        severity: "error",
        summary: error.message,
        detail: "Email address or password ",
        life: 2000,
      });
    } else router.push("/dashboard");
  }

  return (
    <div className="bg-white mt-[50px] mx-[auto] w-[654px] h-[300px] font-inter text-center">
      <Toast ref={toast} />

      <h1 className="text-[24px] mb-[40px] font-bold">Login</h1>
      <div className="p-10 rounded-md border-[1px] border-bordermain">
        <div className="flex flex-row gap-6">
          <div className="text-[16px] font-semibold my-auto min-w-[90px] text-left">
            Username
          </div>
          <InputText
            placeholder="Eg miaranger@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full"
          />
        </div>
        <br />
        <div className="flex flex-row gap-6">
          <div className="text-[16px] font-semibold my-auto min-w-[90px] text-left ">
            Password
          </div>
          <InputText
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassowrd(e.target.value);
            }}
            className="w-full"
          />
        </div>
        <div className="flex flex-row gap-6 mt-6">
          <div className="text-[16px] font-semibold my-auto min-w-[90px] text-left "></div>
          <button
            onClick={async () => {
              await signInWithEmail();
            }}
            className="w-full text-[14px] px-6 py-3 rounded-lg bg-deepback text-white hover:bg-deepbackhover "
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
