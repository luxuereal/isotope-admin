import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRef, useState } from "react";

import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import Header from "@/components/header";
import Layout from "@/components/layout";

const Home = () => {
  const supabase = useSupabaseClient();
  const toast = useRef<any>(null);

  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_pass, setConfirmPass] = useState("");

  const validate = () => {
    if (!new_password || !confirm_pass || !old_password) return false;
    if (new_password.length < 8) return false;
    if (confirm_pass !== new_password) return false;
    return true;
  };
  const changePassword = async () => {
    if (!validate()) {
      toast.current?.show({
        severity: "error",
        summary: "Validate error!",
        detail: "Please input data correctly!",
        life: 2000,
      });
      return;
    }
    const userResponse = await supabase.auth.getUser();
    let email: string = "";
    if (userResponse?.data?.user?.email) email = userResponse.data.user.email;

    const response = await fetch("/api/changepass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        old_password,
      }),
    })
    if (response.ok) {
      const { error } = await supabase.auth.updateUser({
        password: new_password,
      });

      if (error) {
        // Handle error
        toast.current?.show({
          severity: "error",
          summary: error.message,
          detail: "Oops! You are offline.",
          life: 2000,
        });
      } else {
        toast.current?.show({
          severity: "success",
          summary: "Success!",
          detail: "Password changes successfully!",
          life: 2000,
        });
        // Password updated successfully
      }
    }
    else {
      toast.current?.show({
        severity: "error",
        summary: "Invalid Credentials!",
        detail: "Your previous password is incorrect!",
        life: 2000,
      });
    }
  };
  return (
    <Layout>
      <Toast ref={toast} />
      <div className="w-full">
        <Header headers={[{ href: "", name: "Admin Settings" }]} />
        <section className="w-full p-8">
          <div className="w-[654px] mx-auto text-center">
            <h1 className="font-inter text-[24px] my-10 font-bold">
              Change Admin Password
            </h1>
            <div className="w-full rounded-[10px] border-[1px] border-bordermain p-10">
              <div className="flex flex-row gap-6 text-left mb-6">
                <div className="my-auto text-[16px] font-semibold  min-w-[150px] text-left">
                  Previous Password
                </div>
                <InputText
                  placeholder="Enter password"
                  type="password"
                  value={old_password}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                  className="w-full"
                />
              </div>
              <div className="flex flex-row gap-6 text-left mb-6">
                <div className="my-auto text-[16px] font-semibold  min-w-[150px] text-left">
                  New Password
                </div>
                <InputText
                  placeholder="Enter new password"
                  type="password"
                  value={new_password}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  className="w-full"
                />
              </div>
              <div className="flex flex-row gap-6 text-left mb-6">
                <div className="my-auto text-[16px] font-semibold  min-w-[150px] text-left">
                  Repeat Password
                </div>
                <InputText
                  placeholder="Confirm password"
                  type="password"
                  value={confirm_pass}
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                  }}
                  className="w-full"
                />
              </div>
              <div className="flex flex-row gap-6 mt-6">
                <div className="text-[16px] font-semibold my-auto min-w-[150px] text-left "></div>
                <button
                  onClick={changePassword}
                  className="w-full text-[14px] px-6 py-3 rounded-lg bg-deepback text-white hover:bg-deepbackhover "
                >
                  Change password
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
