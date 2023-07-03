const genFirstName = (arr: Array<string>) => {
  let str = '';
  arr.forEach((ar, idx) => {
    if (idx !== arr.length - 1) {
      str += `${ar}, `;
    } else {
      str = str.slice(0, -2);
    }
  });
  return str;
}

export const splitName = (name: string, type: boolean ) => {
  let arr = name.trim().split(/(?=[A-Z])/);
  if (arr.length === 1) 
    return type ? arr[0] : ''
  else 
    return type ? genFirstName(arr) : arr[arr.length - 1]
}