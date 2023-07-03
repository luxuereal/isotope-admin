import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { Database } from "@/utils/database.types";
import { SERVER_ERR_MSG } from "@/utils/messages";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const supabase = createPagesBrowserClient<Database>();
    let { error: urlError } = await supabase.from('chat_gifs')
        .insert({ url: process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/gifs/' + req.body.fileName, is_disabled: false })
    if (!urlError)
        res.status(200).json({ data: 'Success!' });
    else
        res.status(500).json({ data: SERVER_ERR_MSG });
}
