import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { Database } from "../utils/database.types";
type Profiles = Database["public"]["Tables"]["users"]["Row"];

export default function TempComponent({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [session]);

  async function getData() {
    try {
      setLoading(true);
      let { data, error, status } = await supabase
        .from("users")
        .select(`phone_number, email, provider, is_disabled`);

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        console.log(data);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  //   async function updateProfile({
  //     username,
  //     website,
  //     avatar_url,
  //   }: {
  //     username: Profiles['username']
  //     website: Profiles['website']
  //     avatar_url: Profiles['avatar_url']
  //   }) {
  //     try {
  //       setLoading(true)
  //       if (!user) throw new Error('No user')

  //       const updates = {
  //         id: user.id,
  //         username,
  //         website,
  //         avatar_url,
  //         updated_at: new Date().toISOString(),
  //       }

  //       let { error } = await supabase.from('profiles').upsert(updates)
  //       if (error) throw error
  //       alert('Profile updated!')
  //     } catch (error) {
  //       alert('Error updating the data!')
  //       console.log(error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  return (
    <div className="form-widget">{loading ? "Loading ..." : "Finished"}</div>
  );
}
