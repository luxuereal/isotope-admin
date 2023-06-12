import { usePathname } from 'next/navigation';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LinkType } from '@/types';
import { FiLogOut } from "react-icons/fi";

interface Links {
  links: LinkType[];
}

const Navigation = ({ links }: Links) => {

  const { session, error } = useSessionContext();

  const supabase = useSupabaseClient();

  const router = useRouter();

  const pathname = usePathname();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error)
    } else {
      router.push('/signin');
    };
  };

  return (
    <ul className="mt-4 w-full py-4 text-base">
      {links.map((link, idx) => 
          <div key={`lk-${idx}`}>
            <Link
              href={link.href}
              key={`link-${idx}`}
              className='transition-colors'
            >
              <li 
                className={`w-full transition-colors px-4 py-2 my-2 hover:bg-white hover:rounded-md hover:drop-shadow-md hover:text-black ${pathname ? pathname.startsWith(link.href) ? 'bg-white rounded-md drop-shadow-md text-black' : '' : ''}`}>
                  <span className="flex items-center"><link.icon />&nbsp;&nbsp;&nbsp;<span>{link.name}</span></span>
              </li>
            </Link>
            {idx === 4 ? <hr className="border-border" /> : <></>}
          </div>
        )
      }
      {
        session ? 
        <button onClick={signOut} className='w-full'>
          <li className="w-full px-4 py-2 my-2 hover:bg-white hover:rounded-md hover:drop-shadow-md hover:text-black">
            <span className="flex items-center"><FiLogOut />&nbsp;&nbsp;&nbsp;<span>Log out</span></span>
          </li>
        </button> : <></>
      }
    </ul>
  );
}

export default Navigation;