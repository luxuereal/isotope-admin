import Header from "@/components/header";
import Layout from "@/components/layout";
import { useEffect, useRef, useState } from "react";
import { handleUpload } from "@/actions/gifs/upload";
import { Toast } from "primereact/toast";
import { Skeleton } from "primereact/skeleton";
import { GetGifs } from "@/actions/gifs/getGifs";
import useParticipantStore from "@/store/use-participant";
import { GifTable } from "@/components/gifTable";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { showMessage } from "@/utils/messages";

const Home = () => {
  const toast = useRef(null);
  const [is_Loading, setLoading] = useState(false);
  const { setGifArray } = useParticipantStore((state) => state);
  const [is_uploading, setUploading] = useState(true);
  const supabase = useSupabaseClient();
  useEffect(() => {
    (async () => {
      setLoading(true);
      await GetGifs(setGifArray);
      setLoading(false);
    })();
  }, [setGifArray]);

  const handleFileInputChange = async (event: any) => {
    setUploading(false);
    let selectedFile = event.target.files[0];
    let fileName = event.target.files[0].name;
    const filePath = `ava-${Math.random()}-${fileName}`;
    let { error } = await supabase.storage
      .from("gifs")
      .upload(filePath, selectedFile);
    if (error) {
      showMessage(toast, "error", "error", "Image upload failed"!);
      return;
    }
    await handleUpload(toast, filePath);
    await GetGifs(setGifArray);
    setUploading(true);
  };

  return (
    <Layout>
      <Toast ref={toast} />
      <div className="w-full">
        <Header headers={[{ href: "", name: "Upload Gifs" }]} />
        <section className="w-full md:p-8 p-2">
          <div className="md:w-[654px] mx-auto text-center">
            <label htmlFor="images" className="drop-container">
              {is_uploading ? (
                <>
                  <span className="drop-title">Drop file here</span>or
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    required
                  />
                </>
              ) : (
                <Skeleton width="100%" height="100%"></Skeleton>
              )}
            </label>
          </div>
          {is_Loading ? (
            <Skeleton width="100%" height="500px"></Skeleton>
          ) : (
            <GifTable setLoading={setLoading} />
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Home;
