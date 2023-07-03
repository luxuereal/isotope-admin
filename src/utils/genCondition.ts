import { FilterValue } from "@/types/filter.type";

// export const genCondition = (field: string, arr: FilterValue ) => {
//   let str = '(';
//   if (arr && arr.length !== 0) {
//     arr.forEach((element, idx) => {
//       if (idx === arr.length - 1) {
//         str += `${element.code}`;
//       } else {
//         str += `${element.code},`;
//       }
//     });
//   } else {
//     switch (field) {
//       case 'type':
//         str += 'true,false';
//         break;
//       case 'status':
//         str += '0,1,2';
//         break;
//       default:
//         str += 'Man,Woman,Transgender';
//         break;
//     }
//   }  
//   str += ')';
//   console.log(str);
//   return str;
// }

export const genCondition = (field: string, arr: FilterValue ) => {
  let res = [];
  if (arr && arr.length !== 0) {
    arr.forEach((element, idx) => {
      res.push(element.code)
    });
  } else {
    switch (field) {
      case 'type':
        res.push(true);
        res.push(false);
        break;
      case 'status':
        res.push(0);
        res.push(1);
        res.push(2);
        break;
      default:
        res.push('Man');
        res.push('Woman');
        res.push('Transgender');
        break;
    }
  }  
  console.log(res);
  return res;
}