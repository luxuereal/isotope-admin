import { useEffect, useRef, useState } from "react";

import { Dialog } from "primereact/dialog";
import { AiOutlineCheck } from "react-icons/ai";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import Header from "@/components/header";
import Layout from "@/components/layout";
import GetRegisteredUsers from "@/actions/notification/getRegisteredUsers";
import { user_token } from "@/types/users.type";
import { snedMessage } from "@/actions/notification/sendNotification";
import { ProgressSpinner } from "primereact/progressspinner";

const selectedProfileTemplate = (option: any, props: any) => {
  if (option) {
      return (
          <div className="flex align-items-center">
              <div>{option.name.split(' ')[0]}</div>
              <div className="hidden">{option.name.split(' ')[1]}</div>
          </div>
      );
  }
  return <span>{props.placeholder}</span>;
};

const profileTemplate = (option : any) => {
  return (
      <div className="flex align-items-center">
          <div>{option.name.split(' ')[0]}</div>
          <div className="hidden">{option.name.split(' ')[1]}</div>
      </div>
  );
};

const Home = () => {
  const [selectedUsers, setSelectedUsers] = useState<user_token>();
  const [visible, setVisible] = useState(false);
  const [selectoptions, setSelectOptions] = useState<Array<user_token>>();
  const [message, setMessage] = useState<string>();
  const toast = useRef<any>(null);
  const [isLoading, setLoading] = useState(false);

  const sendmessage = async () => {
    setLoading(true);
    await snedMessage(toast, selectedUsers, message, setVisible);
    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      await GetRegisteredUsers(setSelectOptions);
    })();
  }, []);

  return (
    <Layout>
      <Toast ref={toast} />
      <div className="w-full">
        <Header headers={[{ href: "notify", name: "Push Notification" }]} />
        <section className="w-full md:p-8 p-2">
          <div className="md:w-[654px] mx-auto text-center">
            <h1 className="font-inter md:text-[24px] text-[20px] my-10 font-bold">
              Push Notification
            </h1>
            <div className="w-full rounded-[10px] border-[1px] border-bordermain md:p-10 p-3">
              <div className="flex flex-row gap-6 text-left md:mb-6 mb-2">
                <div className="my-auto md:text-[16px] text-[12px] font-semibold  md:min-w-[90px] min-w-[50px] text-left">
                  To:
                </div>
                <Dropdown
                  value={selectedUsers}
                  onChange={(e) => setSelectedUsers(e.value)}
                  valueTemplate={selectedProfileTemplate} 
                  itemTemplate={profileTemplate}
                  options={selectoptions}
                  filter 
                  optionLabel="name"
                  placeholder="One or All Users"
                  className="w-full md:w-full"
                />
              </div>
              <div className="flex flex-row gap-6">
                <div className="md:text-[16px] text-[12px] font-semibold  md:min-w-[90px] text-left">
                  Message:
                </div>
                <InputTextarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  cols={30}
                  placeholder="type message here"
                  className="w-full"
                />
              </div>
              <div className="flex flex-row md:gap-6 md:mt-6 mt-2">
                <div className="text-[16px] font-semibold my-auto md:min-w-[90px] w-0 text-left "></div>
                {isLoading ? (
                  <ProgressSpinner
                    style={{ width: "30px", height: "30px" }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                  />
                ) : (
                  <button
                    onClick={sendmessage}
                    className="w-full text-[14px] px-6 py-3 rounded-lg bg-deepback text-white hover:bg-deepbackhover "
                  >
                    Send
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Dialog
        header=""
        visible={visible}
        style={{ width: "468px", height: "314px" }}
        onHide={() => setVisible(false)}
      >
        <div className="text-center flex flex-col gap-4">
          <div className="bg-[#16B18833] w-16 h-16 mx-auto rounded-[100px] p-[23px]">
            <AiOutlineCheck color="#16B188" size={"20px"} />
          </div>
          <div>
            <p className="font-matter text-[18px] font-semibold">
              Message sent
            </p>
            <p className="font-inter text-[14px] font-medium text-normaltext pt-2">
              Your message has been sent
              <br />
              successfully
            </p>
          </div>
        </div>
      </Dialog>
    </Layout>
  );
};

export default Home;
