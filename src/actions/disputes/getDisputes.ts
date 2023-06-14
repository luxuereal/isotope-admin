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
    uid: dt.uid,
    name: dt.profiles ? dt.profiles.name : null,
    gender: dt.profiles ? dt.profiles.gender : null,
    reporter: dt.disputes ? dt.disputes.reporter : null,
    reason: dt.disputes ? dt.disputes.reason : null
  }));   
}
