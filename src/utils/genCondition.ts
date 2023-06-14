import { FilterValue } from "@/types/filter.type";

export const genCondition = (field: string, arr: FilterValue ) => {
  let str = '(';
  if (arr && arr.length !== 0) {
    arr.forEach((element, idx) => {
      if (idx === arr.length - 1) {
        str += `${element.code}`;
      } else {
        str += `${element.code},`;
      }
    });
  } else {
    switch (field) {
      case 'type':
        str += 'true,false';
        break;
      case 'status':
        str += '0,1,2';
        break;
      default:
        str += 'Man,Woman,Transgender';
        break;
    }
  }  
  str += ')';
  return str;
}