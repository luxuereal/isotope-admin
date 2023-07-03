import Image from "next/image";

import useParticipantStore from "@/store/use-participant";
import { Button } from "primereact/button";
import { EnableGif } from "@/actions/gifs/enableGifs";
import { GetGifs } from "@/actions/gifs/getGifs";
import { DeleteGif } from "@/actions/gifs/deleteGifs";

interface GifTableProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GifTable: React.FC<GifTableProps> = ({ setLoading }) => {
  const { gif_arr, setGifArray } = useParticipantStore((state) => state);
  return (
    <div className="w-full grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5 ">
      {gif_arr.map((item) => {
        return (
          <div
            key={"gif-" + item.id}
            className="border-[#e3e3e3] border-[1px] rounded-md text-center p-5 shadow-xl"
          >
            <Image
              src={item.url}
              alt=""
              width={100}
              height={100}
              className="mx-auto h-[100px] mb-2"
            />
            <div className="w-full flex sm:flex-col flex-row gap-2 text-center items-center">
              {item.is_disabled ? (
                <Button
                  label="Enable"
                  severity="success"
                  className="h-10"
                  onClick={async () => {
                    setLoading(true);
                    await EnableGif(false, item.id);
                    await GetGifs(setGifArray);
                    setLoading(false);
                  }}
                  style={{ width: "100px" }}
                />
              ) : (
                <Button
                  label="Disable"
                  severity="secondary"
                  className="h-10"
                  onClick={async () => {
                    setLoading(true);
                    await EnableGif(true, item.id);
                    await GetGifs(setGifArray);
                    setLoading(false);
                  }}
                  style={{ width: "100px" }}
                />
              )}
              <Button
                label="Delete"
                severity="danger"
                className="h-10"
                onClick={async () => {
                  setLoading(true);
                  await DeleteGif(item.id);
                  await GetGifs(setGifArray);
                  setLoading(false);
                }}
                style={{ width: "100px" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
