import { showMessage } from "@/utils/messages";
import { validateNotification } from "@/utils/validate";
import { MutableRefObject } from "react";
import PushNotification from "./pushNotification";

export const snedMessage = async (toast:MutableRefObject<any>,selectedUsers:any,message:any,setVisible:any) => {
    if (!validateNotification(selectedUsers, message)) {
      showMessage(
        toast,
        "error",
        "Validate Error",
        "Please input data correctly!"
      );
      return;
    }
    if (await PushNotification(selectedUsers ? selectedUsers.code : "", message))
      setVisible(true);
  };