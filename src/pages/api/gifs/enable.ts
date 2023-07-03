import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { Database } from "@/utils/database.types";
import { SERVER_ERR_MSG } from "@/utils/messages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createPagesBrowserClient();

  let { error, status } = await supabase
    .from('chat_gifs')
    .update({ is_disabled: req.body.value })
    .match({ id: req.body.id })

  if (error && status !== 406) {
    throw error;
  }
  if (!error) {
    res.status(200).json({ data: 'Success!' });
  }
  else {
    res.status(500).json({ data: SERVER_ERR_MSG });
  }
}
