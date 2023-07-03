import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export const middleware = async (req: NextRequest) => {

  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  let session = await supabase.auth.getSession()
  let url = req.url.split('/');
  if (!session.data.session && url[url.length - 1] != 'signin')
    return NextResponse.redirect(new URL("/signin", req.url));
  else if(session.data.session && url[url.length - 1] == 'signin')
    return NextResponse.redirect(new URL("/dashboard", req.url));
}

export const config = {
  matcher: ['/analytics', '/dashboard', '/disputes', '/notify', '/setting', '/usermanage', '/signin', '/gifs'],
};