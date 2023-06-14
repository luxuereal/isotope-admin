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
    console.log(req.body.uid)
    let { data, error, status } = await supabase
      .from("users")
      .select(`email, phone_number, is_disabled, report_status, uid, profiles(*), status(address)`)
      .eq('uid', req.body.uid);

    if (error && status !== 406) {
      throw error;
    }
    if (data) {
      res.status(200).json({ data: data[0] });
    }
  } catch (error) {
    res.status(500).json({ data: SERVER_ERR_MSG });
  }
}
