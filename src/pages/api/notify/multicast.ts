import { SERVER_ERR_MSG } from '@/utils/messages';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from 'firebase-admin/lib/database/database';
import { sendNotify } from '@/utils/pushnotify';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let token = req.body.token;
    let message = req.body.message;
    if (token === 'all') {
        const supabase = createPagesBrowserClient<Database>();
        try {
            let { data, error, status } = await supabase
                .from("users")
                .select(`uid, fcm_token`);
            if (error && status !== 406) {
                throw error;
            }
            if (data) {
                data.map((item) => {
                    if (item.fcm_token) {
                        let ok = sendNotify(item.fcm_token, message)
                        if (!ok) {
                            res.status(500).json({ data: SERVER_ERR_MSG });
                            return;
                        }
                    }
                })
            }
        } catch (error) {
            res.status(500).json({ data: SERVER_ERR_MSG });
        }
    }
    else if(token !== ''){
        let ok = sendNotify(token, message)
        if (!ok) {
            res.status(500).json({ data: SERVER_ERR_MSG });
            return;
        }
    }
    res.status(200).json({ data: 'success!' });
}
