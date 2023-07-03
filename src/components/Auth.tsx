import { useRef, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { showMessage } from "@/utils/messages";
import { ProgressSpinner } from "primereact/progressspinner";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const supabase = useSupabaseClient();
  const toast = useRef<any>(null);
  const router = useRouter();
  const [is_loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setLoading(false);
      showMessage(
        toast,
        "error",
        error.message,
        "Email address or password is invalid"
      );
    } else {
      setLoading(false);
      router.reload();
    }
  };

  return (
    <div className="bg-white mt-[50px] mx-[auto] md:w-[654px] w-full h-[300px] font-inter text-center">
      <Toast ref={toast} />

      <h1 className="md:text-[24px] text-[20px] mb-[40px] font-bold">Login</h1>
      <div className="p-10 rounded-md border-[1px] border-bordermain">
        <div className="flex flex-row md:gap-6 gap-3">
          <div className="text-[16px] font-semibold my-auto min-w-[90px] text-left ">
            Email
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
        <div className="flex flex-row md:gap-6 gap-3">
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
        <div className="flex flex-row md:gap-6 mt-6">
          <div className="md:min-w-[90px]"></div>
          {is_loading ? (
            <ProgressSpinner
              style={{ width: "30px", height: "30px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          ) : (
            <button
              onClick={async () => {
                await signInWithEmail();
              }}
              className="w-full text-[14px] px-6 py-3 rounded-lg bg-deepback text-white hover:bg-deepbackhover "
              style={is_loading ? {} : {}}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
