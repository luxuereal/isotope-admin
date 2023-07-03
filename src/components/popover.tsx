import { useState } from"react";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface status {
  type: number;         // 0: Push, 1,2,3: Confirm (suspend, verify, deactivate), 4: Sent successfully
  state: boolean;
  summary: string;
  hide: () => void;
  confirm: (type: number, msg: string | null) => void;
}

const PopOver = ({ type, state, summary, hide, confirm }: status) => {

  const [msg, setMsg] = useState<string>('');

  const getText = (type: number) => 
    type === 1 
      ? 'suspend'
      : type === 2
          ? 'verify'
          : 'deactivate';

  const header = (type: number) => 
    type === 0
      ? 'Send Message'
      : type === 1 
          ? 'Suspend User'
          : type === 2
              ? 'Verify User'
              : type === 3
                  ? 'Deactivate User'
                  : '';

  return (
    <Dialog
      header={header(type)}
      visible={state}
      onHide={hide}
    >
      {
        type === 0
        ?
          <div className="w-full p-4">
            <div className="flex flex-row gap-6 text-left mb-6">
              <div className="my-auto text-[16px] font-semibold  min-w-[90px] text-left">
                To:
              </div>
              <input className="w-full py-2 px-4 rounded-md bg-white !border !border-border" value={`User: ${summary}`} disabled />
            </div>
            <div className="flex flex-row gap-6">
              <div className="text-[16px] font-semibold  min-w-[90px] text-left">
                Message:
              </div>
              <InputTextarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={5}
                cols={50}
                placeholder="type message here"
                className="w-full"
              />
            </div>
            <div className="flex flex-row gap-6 mt-6">
              <div className="text-[16px] font-semibold my-auto min-w-[90px] text-left "></div>
              <button className="w-full text-[14px] px-6 py-3 rounded-lg bg-deepback text-white hover:bg-deepbackhover" onClick={() => confirm(type, msg)}>
                Send
              </button>
            </div>
          </div>
        : type === 1 || type === 2 || type === 3
            ?
              <div className="text-center flex flex-col gap-6 mt-6">
                <div className="bg-grayback w-16 h-16 mx-auto rounded-full p-4">
                  <IoMdInformationCircleOutline color="#52678e" size={"32px"} />
                </div>
                <div>
                  <p className="font-inter text-[14px] font-medium text-normaltext pt-2 sm:break-normal break-all">
                    You are about to {getText(type)} <span className="font-bold">User {summary}</span>,
                    <br /> 
                    click confirm to {getText(type)}  
                  </p>
                </div>
                <div className="flex justify-between mx-auto w-[70%]">
                  <button className="bg-green rounded-md text-white py-2 px-4" onClick={() => confirm(type, null)}>Confirm</button>
                  <button className="bg-white rounded-md border border-border text-normaltext py-2 px-4" onClick={hide}>Cancel</button>
                </div>
              </div>
            : <div className="text-center flex flex-col gap-4 mt-6">
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
      }
    </Dialog>
  )
}

export default PopOver;