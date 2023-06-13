import { useState } from "react";

import { Dialog } from "primereact/dialog";
import { AiOutlineCheck } from "react-icons/ai";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from 'primereact/dropdown';

import Header from "@/components/header";
import Layout from "@/components/layout";



const Home = () => {
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [visible, setVisible] = useState(true);
  return (
    <Layout>
      <div className="w-full">
        <Header headers={[{ href: "notify", name: "Push Notification" }]} />
        <section className="w-full p-8">
          <div className="w-[654px] mx-auto text-center">
            <h1 className="font-inter text-[24px] my-10 font-bold">
              Push Notification
            </h1>
            <div className="w-full rounded-[10px] border-[1px] border-bordermain p-10">
              <div className="flex flex-row gap-6 text-left mb-6">
                <div className="my-auto text-[16px] font-semibold  min-w-[90px] text-left">
                  To:
                </div>
                <Dropdown 
                  value={selectedUsers} 
                  onChange={(e) => setSelectedUsers(e.value)} 
                  options={[
                    { name: "New York", code: "NY" },
                    { name: "Rome", code: "RM" },
                    { name: "London", code: "LDN" },
                    { name: "Istanbul", code: "IST" },
                    { name: "Paris", code: "PRS" },
                  ]} 
                  optionLabel="name" 
                  placeholder="One or All Users" 
                  className="w-full md:w-14rem" />
              </div>
              <div className="flex flex-row gap-6">
                <div className="text-[16px] font-semibold  min-w-[90px] text-left">
                  Message:
                </div>
                <InputTextarea
                  // value={value}
                  // onChange={(e) => setValue(e.target.value)}
                  rows={5}
                  cols={30}
                  placeholder="type message here"
                  className="w-full"
                />
              </div>
              <div className="flex flex-row gap-6 mt-6">
                <div className="text-[16px] font-semibold my-auto min-w-[90px] text-left "></div>
                <button className="w-full text-[14px] px-6 py-3 rounded-lg bg-deepback text-white hover:bg-deepbackhover ">
                  Send
                </button>
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
            <p className="font-matter text-[18px] font-semibold">Message sent</p>
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
