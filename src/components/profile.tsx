import Image from "next/image";
import ReactPlayer from "react-player";

import { xprofile } from "@/types/profile.type";

const Profile = ({profile}: xprofile) => {

  const bioFields:{ name:string; code:string }[] = [
    { name: 'First Name', code: 'fname' },
    { name: 'Last Name', code: 'lname' },
    { name: 'Gender', code: 'gender' },
    { name: 'Age', code: 'age' },
    { name: 'D.O.B', code: 'birthday' },
    { name: 'Zodiac', code: 'zodiac' },
    { name: 'City', code: 'city' },
    { name: 'State', code: 'state' },
    { name: 'Country', code: 'country' },
    { name: 'Phone', code: 'phone_number' },
    { name: 'Email', code: 'email' }
  ]

  const infoFields:{ name:string; code:string }[] = [
    { name: 'Sign-up Date', code: 'up_date' },
    { name: 'Sign-up Time', code: 'up_time' },
    { name: 'Last Login Date', code: 'in_date' },
    { name: 'Last Login Time', code: 'in_time' },
    { name: 'Account Status', code: 'status' },
    { name: 'Reported', code: 'report_status' },
    { name: 'Spotify', code: 'spotify' },
    { name: 'TikTok', code: 'tiktok' },
    { name: 'Meme', code: 'meme' },
    { name: 'Movie/TV', code: 'movie' },
    { name: 'Stories', code: 'stories' },
    { name: 'Dating/Friends', code: 'dt_fr' },
  ]

  return (
    <>
      <div className="rounded-md border border-border w-full h-30 p-5 flex justify-between">
        <div className="h-20 flex items-center font-bold text-xl">
          <Image width='200' height='200' src={profile.photos ? JSON.parse(profile.photos)[0] : '/user/01.png'} className="w-20 h-20 object-cover rounded-full border-2 border-black mr-4" alt="" />
          ID:&nbsp;{profile.uid}
        </div>
        <div className="flex gap-4 items-center">
          <button className="rounded-md border border-border whitespace-nowrap text-black px-4 py-2">Send Message</button>
          <button className="rounded-md border border-border text-black px-4 py-2">Suspend</button>
          <span className="border-l border-border h-10"></span>
          <button className="rounded-md bg-green text-white px-4 py-2">Verify</button>
        </div>
      </div>

      <div className="rounded-md border border-border w-full my-8">
        <div className="bg-grayback text-normaltext p-4">
          Bio Data
        </div>
        <div className="w-full grid md:grid-cols-6 sm:grid-cols-4 p-1 border-collapse gap-1">
          {
            bioFields.map((field, idx) =>
              <div className="p-4 border border-border" key={`bio-ele-${idx}`}>
                <p className="text-normaltext mb-2">{field['name']}</p>
                <p className="text-black font-bold">{profile[field['code']] || 'None'}</p>
              </div>
            )
          }
        </div>
      </div>
      

      <div className="rounded-md border border-border w-full my-8">
        <div className="bg-grayback text-normaltext p-4">
          Account Information
        </div>
        <div className="w-full grid md:grid-cols-6 sm:grid-cols-4 p-1 border-collapse gap-1">
          {
            infoFields.map((field, idx) =>
              <div className="p-4 border border-border" key={`info-ele-${idx}`}>
                <p className="text-normaltext mb-2">{field['name']}</p>
                <div className="text-black font-bold">
                  {
                    field['code'] === 'status' 
                    ? profile[field['code']] 
                        ? <span className="text-green">Active</span>
                        : <span className="text-pink">Passive</span>
                    : field['code'] === 'report_status' 
                        ? profile[field['code']] 
                            ? 'Yes'
                            : 'No'
                        : field['code'] === 'tiktok' || field['code'] === 'meme'
                            ? profile[field['code']] 
                                ? <Image width="200" height="200" className="w-20 h-20 rounded-md drop-shadow-md" src={profile[field['code']]} alt="" />
                                : 'None'
                            : field['code'] === 'movie'
                                ? <ReactPlayer
                                    width="80"
                                    height="30" 
                                    controls
                                    url={profile[field['code']]}
                                  />
                            // : 
                            // field['code'] === 'spotify' || field['code'] === 'stories'
                            //     ? JSON.parse(profile[field['code']]).length !== 0
                            //         ? <Image width="200" height="200" className="w-16 h-16" src={JSON.parse(profile[field['code']])[0]} alt="" />
                            //         : 'None'
                                : profile[field['code']] || 'None'
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>

      <div className="rounded-md bg-grayback border border-border w-full p-5">
        <p className="mb-4 text-normaltext font-bold text-xl">Verification Selfie</p>
        <div className="h-20">
          <Image width='200' height='200' src={profile.photos ? JSON.parse(profile.photos)[0] : '/user/01.png'} className="w-20 h-20 object-cover rounded-full border-2 border-black mr-4" alt="" />
        </div>
      </div>
    </>
  )
}

export default Profile;