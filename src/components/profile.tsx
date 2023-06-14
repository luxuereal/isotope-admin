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
      <div className="rounded-md border border-border w-full h-30 sm:p-5 p-2 xl:flex xl:justify-between">
        <div className="h-20 sm:flex items-center font-bold xl:text-xl sm:text-base text-xs xl:mb-0 sm:mb-2 xs:mb-8 mb-16">
          <Image width='200' height='200' src={profile.photos ? JSON.parse(profile.photos)[0] : '/user/01.png'} className="w-20 h-20 object-cover rounded-full border-2 border-black mr-4" alt="" />
          <span className="break-all">ID:&nbsp;{profile.uid}</span>
        </div>
        <div className="flex sm:flex-row flex-col gap-4 sm:items-center items-end justify-end xs:text-base text-sm">
          <button className="rounded-md border border-border whitespace-nowrap text-black sm:px-4 sm:py-2 px-2 py-1">Send Message</button>
          <button className="rounded-md border border-border text-black sm:px-4 sm:py-2 px-2 py-1">Suspend</button>
          <span className="border-l border-border h-10 sm:inline-block hidden"></span>
          <button className="rounded-md bg-green text-white sm:px-4 sm:py-2 px-2 py-1">Verify</button>
        </div>
      </div>

      <div className="rounded-md border border-border w-full my-8">
        <div className="bg-grayback text-normaltext p-4">
          Bio Data
        </div>
        <div className="w-full sm:text-base text-sm grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cold-3 xs:grid-cols-2 grid-cols-1 p-1 border-collapse gap-1">
          {
            bioFields.map((field, idx) =>
              <div className="p-4 border border-border rounded-sm" key={`bio-ele-${idx}`}>
                <p className="text-normaltext mb-2">{field['name']}</p>
                <p className="text-black font-bold break-all">{profile[field['code']] || 'None'}</p>
              </div>
            )
          }
        </div>
      </div>
      

      <div className="rounded-md border border-border w-full my-8">
        <div className="bg-grayback text-normaltext p-4">
          Account Information
        </div>
        <div className="w-full sm:text-base text-sm grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cold-3 xs:grid-cols-2 grid-cols-1 p-1 border-collapse gap-1">
          {
            infoFields.map((field, idx) =>
              <div className="p-4 border border-border rounded-sm" key={`info-ele-${idx}`}>
                <p className="text-normaltext mb-2">{field['name']}</p>
                <div className="text-black font-bold break-all">
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
                                : field['code'] === 'spotify' || field['code'] === 'stories'
                                    ? profile[field['code']] && profile[field['code']] !== '[]'
                                        ? <Image width="200" height="200" className="w-20 h-20 rounded-md drop-shadow-md" src={JSON.parse(profile[field['code']])[0]} alt="" />
                                        : 'None'
                                    : profile[field['code']] || 'None'
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>

      <div className="rounded-md bg-grayback border border-border w-full p-5">
        <p className="mb-4 text-normaltext font-bold sm:text-xl text-base">Verification Selfie</p>
        <div className="h-20">
          <Image width='200' height='200' src={profile.photos ? JSON.parse(profile.photos)[0] : '/user/01.png'} className="w-20 h-20 object-cover rounded-full border-2 border-black mr-4" alt="" />
        </div>
      </div>
    </>
  )
}

export default Profile;