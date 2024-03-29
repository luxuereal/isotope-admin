import { calculateAge } from "@/utils/calculateAge";
import { splitName } from "@/utils/splitName";

export default async function eachProfile(uid: string) {
  const response = await fetch("/api/usermanage/detail", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid
      }),
  })
  
  if(response.ok === false)
      return 0;

  const { data } = await response.json();

  return {
    uid: data.uid,
    photos: data.profiles ? data.profiles.photos : null,
    selfie: data.selfie,
    is_verified: data.is_verified,
    token: data.fcm_token,
    fname: data.profiles ? splitName(data.profiles.name, true) : null, 
    lname: data.profiles ? splitName(data.profiles.name, false) : null,
    gender: data.profiles ? data.profiles.gender : null,
    age: data.profiles ? calculateAge(data.profiles.birthday) : null,
    birthday: data.profiles ? data.profiles.birthday : null,
    zodiac: '',
    city: data.status ? data.status.address.split(',')[0] : null,
    state: data.status ? data.status.address.split(',')[1] : null,
    country: data.status ? data.status.address.split(',')[2] : null,
    phone_number: data.phone_number,
    email: data.email,
    up_date: data.profiles ? new Date(data.profiles.created_at).toLocaleDateString() : null,
    up_time: data.profiles ? new Date(data.profiles.created_at).toLocaleTimeString() : null, 
    in_date: data.profiles ? new Date(data.profiles.created_at).toLocaleDateString() : null,
    in_time: data.profiles ? new Date(data.profiles.created_at).toLocaleTimeString() : null, 
    status: data.is_disabled,
    is_deleted: data.is_deleted,
    report_status: data.profiles ? data.profiles.disputes ? data.profiles.disputes.length !== 0 ? true : false : null : null,
    spotify: data.profiles ? data.profiles.spotify_songs : null,
    tiktok: data.profiles ? data.profiles.tiktok : null,
    meme: data.profiles ? data.profiles.meme : null,
    movie: data.profiles ? data.profiles.movie : null,
    stories: data.stories ? data.stories.images : null,
    dt_fr: data.profiles ? data.profiles.i_am_here_to : null,
  };
}
