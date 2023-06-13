import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/utils/database.types'

export const middleware = async (req: NextRequest) => {

  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  let session = await supabase.auth.getSession()
  if(!session.data.session)
    return NextResponse.redirect(new URL("/signin", req.url));
}

export const config = {
  matcher: ['/analytics', '/dashboard', '/disputes', '/notify', '/setting', '/usermanage'],
};