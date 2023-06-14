import Image from "next/image";

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

  const bioRowNum:number = Math.ceil((bioFields.length - 1) / 6 );

  const infoRowNum:number = Math.ceil((bioFields.length - 1) / 6 );




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
        <table className="w-full border-collapse">
          <tbody>
            {
              [...Array(bioRowNum)].map((tr, idx) =>
                <tr key={`tr-${idx}`} className="">
                  {idx !== bioRowNum - 1
                    ?
                      [...Array(6)].map((td, id) =>
                        <td className="p-4 w-[16.66%] first:border-l-0" key={`td-${idx}-${id}`}>
                          <p className="text-normaltext mb-2">{bioFields[idx * 6 + id]['name']}</p>
                          <p className="text-black font-bold">{profile[bioFields[idx * 6 + id]['code']] || 'None'}</p>
                        </td>
                      )
                    :
                      [...Array(6)].map((td, id) =>
                        <td className="p-4 w-[16.66%] first:border-l-0 border-b-0" key={`td-${idx}-${id}`}>
                          {id < bioFields.length - 6 * idx
                            ? <>
                                <p className="text-normaltext mb-2">{bioFields[idx * 6 + id]['name']}</p>
                                <p className="text-black font-bold">{profile[bioFields[idx * 6 + id]['code']] || 'None'}</p>
                              </>
                            : <></>
                          }                        
                        </td>
                      )
                    }
                  
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      

      <div className="rounded-md border border-border w-full my-8">
        <div className="bg-grayback text-normaltext p-4">
          Account Information
        </div>
        <table className="w-full border-collapse">
          <tbody>
            {
              [...Array(infoRowNum)].map((tr, idx) =>
                <tr key={`tr-${idx}`}>
                  {idx !== infoRowNum - 1
                    ?
                      [...Array(6)].map((td, id) =>
                        <td className="p-4 w-[16.66%] gap-y-6 first:border-l-0" key={`td-${idx}-${id}`}>
                          <p className="text-normaltext mb-2">{infoFields[idx * 6 + id]['name']}</p>
                          <p className="text-black font-bold">{
                            infoFields[idx * 6 + id]['code'] === 'status' 
                              ? profile[infoFields[idx * 6 + id]['code']] 
                                  ? <span className="text-green">Active</span>
                                  : <span className="text-pink">Passive</span>
                              : infoFields[idx * 6 + id]['code'] === 'reported' 
                                  ? profile[infoFields[idx * 6 + id]['code']] 
                                      ? 'Yes'
                                      : 'No'
                                  : profile[infoFields[idx * 6 + id]['code']] 
                          }</p>
                        </td>
                      )
                    :
                      [...Array(6)].map((td, id) =>
                        <td className="p-4 w-[16.66%] gap-y-6 first:border-l-0 border-b-0" key={`td-${idx}-${id}`}>
                          {id < infoFields.length - 6 * idx
                            ? <>
                                <p className="text-normaltext mb-2">{infoFields[idx * 6 + id]['name']}</p>
                                <p className="text-black font-bold">{profile[infoFields[idx * 6 + id]['code']] || 'None'}</p>
                              </>
                            : <></>
                          }                        
                        </td>
                      )
                    }
                  
                </tr>
              )
            }
          </tbody>
        </table>
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