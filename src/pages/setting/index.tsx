import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRef, useState } from "react";

import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import Header from "@/components/header";
import Layout from "@/components/layout";
import { validatePassword } from "@/utils/validate";
import changePassword from "@/actions/auth/changepass";
import { showMessage } from "@/utils/messages";

const Home = () => {
  const supabase = useSupabaseClient();
  const toast = useRef<any>(null);

  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_pass, setConfirmPass] = useState("");

  
  const change = async () => {
    if (!validatePassword(old_password, new_password, confirm_pass)) {
      showMessage(toast, "error", "Validate error!", "Please input data correctly!");
      return;
    }
    const userResponse = await supabase.auth.getUser();
    let email: string = "";
    if (userResponse?.data?.user?.email) email = userResponse.data.user.email;

    let ok = await changePassword(email,old_password);
    if(ok){
      const { error } = await supabase.auth.updateUser({
        password: new_password,
      });
      if (error) {
        //Offline
        showMessage(toast, "error", error.message, "Oops! You are offline!");
      } else {
        // Password updated successfully
        showMessage(toast, "success", "Success!", "Password changes successfully!");
      }
    }
    else {
      //Old password is incorrect!
      showMessage(toast, "error", "Invalid Credentials!", "Your previous password is incorrect!");
    }
  }

  return (
    <Layout>
      <Toast ref={toast} />
      <div className="w-full">
        <Header headers={[{ href: "", name: "Admin Settings" }]} />
        <section className="w-full lg:p-8 p-2">
          <div className="max-w-[654px] mx-auto text-center">
            <h1 className="font-inter lg:text-[24px] text-[14px] my-10 font-bold">
              Change Admin Password
            </h1>
            <div className="w-full rounded-[10px] border-[1px] border-bordermain lg:p-10 p-3">
              <div className="flex flex-row lg:gap-6 gap-2 text-left lg:mb-6 mb-2 lg:h-11 h-8">
                <div className="my-auto lg:text-[16px] text-[10px] font-semibold  lg:min-w-[150px] min-w-[100px] text-left">
                  Previous Password
                </div>
                <InputText
                  placeholder="Enter password"
                  type="password"
                  value={old_password}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-row lg:gap-6 gap-2 text-left lg:mb-6 mb-2 lg:h-11 h-8">
                <div className="my-auto lg:text-[16px] text-[10px] font-semibold  lg:min-w-[150px] min-w-[100px] text-left">
                  New Password
                </div>
                <InputText
                  placeholder="Enter new password"
                  type="password"
                  value={new_password}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-row lg:gap-6 gap-2 text-left lg:mb-6 mb-2 lg:h-11 h-8">
                <div className="my-auto lg:text-[16px] text-[10px] font-semibold  lg:min-w-[150px] min-w-[100px] text-left">
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
              <div className="flex flex-row lg:gap-6 lg:mt-6 mt-2">
                <div className="text-[16px] font-semibold my-auto lg:min-w-[150px] w-[0px] text-left "></div>
                <button
                  onClick={change}
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
