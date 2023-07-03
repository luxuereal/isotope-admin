import { user_state } from "@/types/users.type";

export const resize = (data:Array<user_state>) => {
    let temp = data;
    while (temp.length < 3) {
      temp.push({ name: "Nan", value: 0 });
    }
    let total = temp[0].value + temp[1].value + temp[2].value;
    temp[0].value = Math.floor(temp[0].value / total * 100);
    temp[1].value = Math.floor(temp[1].value / total * 100);
    temp[2].value = Math.floor(temp[2].value / total * 100);
    return temp;
  }