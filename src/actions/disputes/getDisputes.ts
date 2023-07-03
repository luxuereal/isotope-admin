import { disputesRes } from "@/types/disputes.type";

export default async function getDisputes(val: {
  start: number;
  end: number;
}) {
  
  const response = await fetch("/api/disputes/disputes", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        range: val
      }),
  })
  
  if(response.ok === false)
      return 0;
      
  const { data } = await response.json();

  return data.map((dt: disputesRes, idx: number) => ({
    id: idx + 1,
    uid: dt.reportee,
    email: dt.profiles ? dt.profiles.users ? dt.profiles.users.email : null : null,
    phone_number: dt.profiles ? dt.profiles.users ? dt.profiles.users.phone_number : null : null,
    name: dt.profiles ? dt.profiles.name : null,
    gender: dt.profiles ? dt.profiles.gender : null,
    reporter: dt.reporter,
    by_email: dt.users ? dt.users.eamil : null,
    by_phone_number: dt.users ? dt.users.phone_number : null,
    reason: dt.reason
  }));   
}
