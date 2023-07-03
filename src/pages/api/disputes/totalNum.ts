import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { Database } from "@/utils/database.types";
import { SERVER_ERR_MSG } from "@/utils/messages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createPagesBrowserClient<Database>();
  try {
    let { count, error, status } = await supabase
      .from("disputes")
      .select(`*`, { count: "exact", head: true })
      .eq('status', false)

    if (error && status !== 406) {
      throw error;
    }

    if (count) {
      res.status(200).json({ count });
    }
    
  } catch (error) {
    res.status(500).json({ data: SERVER_ERR_MSG });
  }
}
