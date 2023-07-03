import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { genCondition } from "@/utils/genCondition";
import { Database } from "@/utils/database.types";
import { SERVER_ERR_MSG } from "@/utils/messages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createPagesBrowserClient<Database>();
  try {
    let { count, error, status } = req.body.filter.length === 0 
      ? await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
      : await supabase
        .from("profiles")
        .select(`gender, users!inner ( is_premium, report_status )`, { count: "exact", head: true })
        .in('gender', genCondition('gender', req.body.filter.gender))
        .in('users.is_premium', genCondition('type', req.body.filter.type))
        .in('users.report_status', genCondition('status', req.body.filter.status))

    if (error && status !== 406) {
      throw error;
    } else {
      res.status(200).json({ count });
    }
  } catch (error) {
    res.status(500).json({ data: SERVER_ERR_MSG });
  }
}
