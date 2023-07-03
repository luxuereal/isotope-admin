import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import { Toast } from "primereact/toast";
import { Carousel } from "primereact/carousel";

import PopOver from "./popover";
import GenZodiac from "./genZodiac";
import confirmFunc from "@/actions/usermanage/confirm";
import PushNotification from "@/actions/notification/pushNotification";
import { showMessage } from "@/utils/messages";
import { bioFields } from "@/utils/constant";
import { xprofile } from "@/types/profile.type";
import { Status } from "@/types/profile.type";

const Profile = ({ profile }: xprofile) => {
  const router = useRouter();

  const toast = useRef<any>(null);

  const [status, setStatus] = useState<Status>({
    push: false,
    suspend: false,
    verify: false,
    deactivate: false,
    sent: false,
  });

  const [type, setType] = useState<number>(-1);

  const clickButton = (field: string) => {
    setStatus((prevState) => ({
      ...prevState,
      [field]: true,
    }));
    setType(Object.keys(status).indexOf(field));
  };

  const closeDialog = async () => {
    setStatus({
      push: false,
      suspend: false,
      verify: false,
      deactivate: false,
      sent: false,
    });
    setType(-1);
  };

  const clickConfirm = async (type: number, msg: string | null) => {
    await closeDialog();
    if (type === 1 || type === 2 || type === 3) {
      let data = await confirmFunc(profile.uid, type);
      if (data) {
        router.reload();
      }
    } else {
      let res = await PushNotification(profile.token, (msg = ""));
      if (res) {
        showMessage(
          toast,
          "success",
          "Success",
          "Message is sent successfully."
        );
      }
    }
  };

  const dt_fr_str = (src: string) => {
    let arr = JSON.parse(src);
    let res = "";
    if (arr[0] === "true") {
      res += "Dating";
      if (arr[1] === "true") {
        res += ", Friends";
      }
    } else {
      if (arr[1] === "true") {
        res += "Friends";
      }
    }
    return res;
  };

  const [autoPlay, setAutoPlay] = useState<number | undefined>(5000);

  const photoCarouselTemplate = (element: string) => (
    <Image
      src={element}
      width="200"
      height="200"
      className="w-24 h-20 border-2 border-black rounded-full z-0 object-cover drop-shadow-md"
      alt=""
    />
  );

  const storyCarouselTemplate = (element: string) =>
    element.endsWith(".mp4") || element.endsWith(".MP4") ? (
      <ReactPlayer
        width="80"
        height="30"
        controls
        url={element}
        onStart={() => setAutoPlay(60000)}
        onPlay={() => setAutoPlay(60000)}
        onPause={() => setAutoPlay(5000)}
        onEnded={() => setAutoPlay(5000)}
        className="!h-24"
      />
    ) : (
      <Image
        src={element}
        width="200"
        height="200"
        className="w-24 h-24 rounded-md object-cover drop-shadow-md"
        alt=""
      />
    );

  const spotifyCarouselTemplate = (element: {
    imageUrl: string;
    externalUrl: string;
    label: string;
    description: string;
  }) => (
    <a href={element.externalUrl} className="w-24" target="_blank">
      <Image
        src={element.imageUrl}
        width="200"
        height="200"
        className="w-24 h-24 rounded-md object-cover drop-shadow-md"
        alt={element.label}
      />
    </a>
  );

  const printStatus = () => {
    if (profile.status === false && profile.is_deleted === false)
      return <span className="text-green">Active</span>;
    if (profile.status === true)
      return <span className="text-pink">Disabled</span>;
    if (profile.is_deleted === true)
      return <span className="text-pink">Deleted</span>;
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="rounded-md border border-border w-full h-30 sm:p-5 p-2 xl:flex xl:justify-between">
        <div className="h-20 sm:flex items-center font-bold xl:text-xl sm:text-base text-xs xl:mb-0 sm:mb-2 xs:mb-8 mb-16">
          {!profile.photos || JSON.parse(profile.photos).length === 0 ? (
            <Image
              width="200"
              height="200"
              src="/icons/default_user.jpg"
              className="w-20 h-20 object-cover rounded-full border-2 border-black mr-4"
              alt=""
            />
          ) : (
            <div className="w-20 h-20 rounded-full mr-4 z-10">
              <Carousel
                value={JSON.parse(profile.photos)}
                numVisible={1}
                numScroll={1}
                itemTemplate={photoCarouselTemplate}
                showNavigators={false}
                showIndicators={false}
                autoplayInterval={5000}
              />
            </div>
          )}
          <span className="break-all">
            User:&nbsp;{profile.email ? profile.email : profile.phone_number}
          </span>
        </div>
        <div className="flex sm:flex-row flex-col gap-4 sm:items-center items-end justify-end xs:text-base text-sm">
          <button
            className="rounded-md border border-border whitespace-nowrap text-black sm:px-4 sm:py-2 px-2 py-1"
            onClick={() => clickButton("push")}
          >
            Send Message
          </button>
          {profile.report_status ? (
            <button
              className="rounded-md border border-border text-black sm:px-4 sm:py-2 px-2 py-1"
              onClick={() => clickButton("suspend")}
            >
              Suspend
            </button>
          ) : (
            <></>
          )}
          {!profile.is_verified ? (
            <>
              <span className="border-l border-border h-10 sm:inline-block hidden"></span>
              <button
                className="rounded-md bg-green text-white sm:px-4 sm:py-2 px-2 py-1"
                onClick={() => clickButton("verify")}
              >
                Verify
              </button>
            </>
          ) : !profile.status ? (
            <>
              <span className="border-l border-border h-10 sm:inline-block hidden"></span>
              <button
                className="rounded-md border border-border text-black sm:px-4 sm:py-2 px-2 py-1"
                onClick={() => clickButton("deactivate")}
              >
                Deactivate
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="rounded-md border border-border w-full my-8">
        <div className="bg-grayback text-normaltext p-4">Bio Data</div>
        <div className="w-full sm:text-base text-sm grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cold-3 xs:grid-cols-2 grid-cols-1 p-1 border-collapse gap-1">
          {bioFields.map((field, idx) => (
            <div
              className="p-4 border border-border rounded-sm"
              key={`bio-ele-${idx}`}
            >
              <p className="text-normaltext mb-2">{field["name"]}</p>
              <div className="text-black font-bold break-all">
                {field["code"] === "zodiac" ? (
                  <GenZodiac birthday={profile.birthday} />
                ) : (
                  profile[field["code"]] || ""
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-md border border-border w-full my-8">
        <div className="bg-grayback text-normaltext p-4">
          Account Information
        </div>
        <div className="w-full sm:text-base text-sm grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cold-3 xs:grid-cols-2 grid-cols-1 p-1 border-collapse gap-1">
          <div className="p-4 border border-border rounded-sm">
            <p className="text-normaltext mb-2">Sign Up Date</p>
            <div className="text-black font-bold break-all">
              {profile.up_date}
            </div>
          </div>

          <div className="p-4 border border-border rounded-sm">
            <p className="text-normaltext mb-2">Sign Up Time</p>
            <div className="text-black font-bold break-all">
              {profile.up_time}
            </div>
          </div>

          <div className="p-4 border border-border rounded-sm">
            <p className="text-normaltext mb-2">Last Log In Date</p>
            <div className="text-black font-bold break-all">
              {profile.in_date}
            </div>
          </div>

          <div className="p-4 border border-border rounded-sm">
            <p className="text-normaltext mb-2">Last Log In Time</p>
            <div className="text-black font-bold break-all">
              {profile.in_time}
            </div>
          </div>

          <div className="p-4 border border-border rounded-sm">
            <p className="text-normaltext mb-2">Account Status</p>
            <div className="text-black font-bold break-all">
              {printStatus()}
            </div>
          </div>

          <div className="p-4 border border-border rounded-sm">
            <p className="text-normaltext mb-2">Reported</p>
            <div className="text-black font-bold break-all">
              {profile.report_status ? "Yes" : "No"}
            </div>
          </div>

          <div className="p-4 border border-border rounded-sm">
            <p className="text-normaltext mb-2">Spotify</p>
            <div className="text-black font-bold break-all">
              {!profile.spotify || JSON.parse(profile.spotify).length === 0 ? (
                <Image
                  width="200"
                  height="200"
                  className="w-28 h-24 rounded-md p-2 drop-shadow-md"
                  src={"/icons/default_img.png"}
                  alt="No image"
                />
              ) : (
                <Carousel
                  value={JSON.parse(profile.spotify)}
                  numVisible={1}
                  numScroll={1}
                  itemTemplate={spotifyCarouselTemplate}
                  showNavigators={false}
                  showIndicators={false}
                  autoplayInterval={5000}
                />
              )}
            </div>
          </div>

          <div className="p-4 border border-border rounded-sm">
            <p className="text-normaltext mb-2">Tiktok</p>
            <div className="text-black font-bold break-all">
              {profile.tiktok ? (
                <Image
                  width="200"
                  height="200"
                  className="w-24 h-24 rounded-md object-cover drop-shadow-md"
                  src={`https://getttthumbnail-dvstskdbbq-uc.a.run.app?q=${profile.tiktok}`}
                  alt="Tik Tok"
                />
              ) : (
                <Image
                  width="200"
                  height="200"
                  className="w-28 h-24 rounded-md p-2 drop-shadow-md"
                  src={"/icons/default_tv.png"}
                  alt="No image"
                />
              )}
            </div>
          </div>

          <div className="p-4 border border-border rounded-sm">
            <p className="text-normaltext mb-2">Meme</p>
            <div className="text-black font-bold break-all">
              {profile.meme ? (
                <Image
                  width="200"
                  height="200"
                  className="w-24 h-24 rounded-md object-cover drop-shadow-md"
                  src={profile.meme}
                  alt=""
                />
              ) : (
                <Image
                  width="200"
                  height="200"
                  className="w-28 h-24 rounded-md p-2 drop-shadow-md"
                  src={"/icons/default_img.png"}
                  alt="No image"
                />
              )}
            </div>
          </div>

          <div className="p-4 border border-border rounded-sm">
            <p className="text-normaltext mb-2">Movie / TV</p>
            <div className="text-black font-bold break-all">
              {profile.movie ? (
                <ReactPlayer
                  width="80"
                  height="30"
                  controls
                  url={profile.movie}
                  className="!h-24"
                />
              ) : (
                <Image
                  width="200"
                  height="200"
                  className="w-28 h-24 rounded-md p-2 drop-shadow-md"
                  src={"/icons/default_tv.png"}
                  alt="No image"
                />
              )}
            </div>
          </div>

          <div className="p-4 border border-border rounded-sm">
            <p className="text-normaltext mb-2">Stories</p>
            <div className="text-black font-bold break-all">
              {!profile.stories || JSON.parse(profile.stories).length === 0 ? (
                <Image
                  width="200"
                  height="200"
                  className="w-28 h-24 rounded-md p-2 drop-shadow-md"
                  src={"/icons/default_img.png"}
                  alt="No image"
                />
              ) : (
                <Carousel
                  value={JSON.parse(profile.stories)}
                  numVisible={1}
                  numScroll={1}
                  itemTemplate={storyCarouselTemplate}
                  showNavigators={false}
                  showIndicators={false}
                  autoplayInterval={autoPlay}
                />
              )}
            </div>
          </div>

          <div className="p-4 border border-border rounded-sm">
            <p className="text-normaltext mb-2">Dating / Friends</p>
            <div className="text-black font-bold break-all">
              {profile.dt_fr ? dt_fr_str(profile.dt_fr) : ""}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md bg-grayback border border-border w-full p-5">
        <p className="mb-4 text-normaltext font-bold sm:text-xl text-base">
          Verification Image
        </p>
        <div className="h-20">
          <Image
            width="200"
            height="200"
            src={profile.selfie ? profile.selfie : "/icons/default_user.jpg"}
            className="w-20 h-20 object-cover rounded-full border-2 border-black mr-4"
            alt=""
          />
        </div>
      </div>

      {type !== -1 ? (
        <PopOver
          type={type}
          state={status[Object.keys(status)[type]]}
          summary={profile.email ? profile.email : profile.phone_number}
          hide={closeDialog}
          confirm={clickConfirm}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
