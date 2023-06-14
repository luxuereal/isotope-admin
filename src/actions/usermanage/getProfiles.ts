import { calculateAge } from "@/utils/calculateAge";
import { FilterUser } from "@/types/filter.type";
import { userRes } from '@/types/users.type';

export default async function filterProfiles(val: {
  start: number;
  end: number;
}, filter: FilterUser | [] = []) {
  const response = await fetch("/api/usermanage/profiles", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        range: val,
        filter: filter
      }),
  })
  
  if(response.ok === false)
      return 0;
      
  const { data } = await response.json();

  return data.map((dt: userRes, idx: number) => ({
    id: idx + 1,
    uid: dt.uid,
    name: dt.profiles ? dt.profiles.name : null,
    gender: dt.profiles ? dt.profiles.gender : null,
    age: dt.profiles ? calculateAge(dt.profiles.birthday) : null
  }));   
}
