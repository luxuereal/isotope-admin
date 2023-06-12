// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next'

const SERVER_ERR_MSG = "Something went wrong in a server.";
import { Database } from "@/utils/database.types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const supabase = createPagesBrowserClient<Database>();
    try {
        let { data, error, status } = await supabase
            .from("users")
            .select(`uid, is_disabled`);
        if (error && status !== 406) {
            throw error;
        }
        if (data) {
            res.status(200).json({ data });
        }
    } catch (error) {
        res.status(500).json({ data: SERVER_ERR_MSG });
    }
}
