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
    let { uid, type } = req.body;

    let field = type === 1 ? 'report_status' : type === 2 ? 'is_verified' : 'is_disabled';
    let value: number | any = type === 1 ? 2 : type === 2 ? true : true;

    let {error, status} = await supabase
      .from("users")
      .update({ [field]: value})
      .eq('uid', uid);

    if (error) {
      throw error;
    }
    if (status === 200 || status === 204) {
      res.status(200).json({ data: true });
    }
  } catch (error) {
    res.status(500).json({ data: SERVER_ERR_MSG });
  }
}
