import { User } from "@/types";

interface Profile {
  profile: User;
}

const Profile = ({profile}: Profile) => {

  console.log(profile);

  const bioFields:{ name:string; code:string }[] = [
    { name: 'First Name', code: 'fname' },
    { name: 'Last Name', code: 'lname' },
    { name: 'Gender', code: 'gender' },
    { name: 'Age', code: 'age' },
    { name: 'D.O.B', code: 'birth' },
    { name: 'Zodiac', code: 'zodiac' },
    { name: 'City', code: 'city' },
    { name: 'State', code: 'state' },
    { name: 'Country', code: 'country' },
    { name: 'Phone', code: 'phone' },
    { name: 'Email', code: 'email' }
  ]

  const infoFields:{ name:string; code:string }[] = [
    { name: 'Sign-up Date', code: 'up-date' },
    { name: 'Sign-up Time', code: 'up-time' },
    { name: 'Last Login Date', code: 'in-date' },
    { name: 'Last Login Time', code: 'in-time' },
    { name: 'Account Status', code: 'status' },
    { name: 'Reported', code: 'reported' },
    { name: 'Spotify', code: 'spotify' },
    { name: 'TikTok', code: 'tiktok' },
    { name: 'Meme', code: 'meme' },
    { name: 'Movie/TV', code: 'movie' },
    { name: 'Stories', code: 'stories' },
    { name: 'Dating/Friends', code: 'fr' },
  ]

  const bioRowNum:number = Math.ceil((bioFields.length - 1) / 6 );

  const infoRowNum:number = Math.ceil((bioFields.length - 1) / 6 );


  return (
    <>
      <div className="rounded-md border border-border w-full h-30 p-5 flex justify-between">
        <div className="h-20 flex items-center font-bold text-xl">
          <img src="user/03.jpg" className="w-20 h-20 object-cover rounded-full border-2 border-black mr-4" alt="" />
          ID: IS0032
        </div>
        <div className="flex gap-8 items-center">
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
                        <td className="p-4 w-[16.66%] gap-y-6 first:border-l-0" key={`td-${idx}-${id}`}>
                          <p className="text-normaltext">{bioFields[idx * 6 + id]['name']}</p>
                          <p className="text-black font-bold">Asa</p>
                        </td>
                      )
                    :
                      [...Array(6)].map((td, id) =>
                        <td className="p-4 w-[16.66%] gap-y-6 first:border-l-0 border-b-0" key={`td-${idx}-${id}`}>
                          {id < bioFields.length - 6 * idx
                            ? <>
                                <p className="text-normaltext">{bioFields[idx * 6 + id]['name']}</p>
                                <p className="text-black font-bold">Asa</p>
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
                          <p className="text-normaltext">{infoFields[idx * 6 + id]['name']}</p>
                          <p className="text-black font-bold">Asa</p>
                        </td>
                      )
                    :
                      [...Array(6)].map((td, id) =>
                        <td className="p-4 w-[16.66%] gap-y-6 first:border-l-0 border-b-0" key={`td-${idx}-${id}`}>
                          {id < infoFields.length - 6 * idx
                            ? <>
                                <p className="text-normaltext">{infoFields[idx * 6 + id]['name']}</p>
                                <p className="text-black font-bold">Asa</p>
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
          <img src="user/03.jpg" className="w-20 h-20 object-cover rounded-full border-2 border-black mr-4" alt="" />
        </div>
      </div>
    </>
  )
}

export default Profile;