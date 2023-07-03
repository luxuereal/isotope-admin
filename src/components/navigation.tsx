import { usePathname } from 'next/navigation';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiLogOut } from "react-icons/fi";
import { LinkType } from '@/types/link.type';

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
      router.reload();
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
                className={`w-full transition-colors lg:px-4 px-2 py-2 my-2 hover:bg-white hover:rounded-md hover:drop-shadow-md hover:text-black ${pathname ? pathname.startsWith(link.href) ? 'bg-white rounded-md drop-shadow-md text-black' : '' : ''}`}>
                  <span className="flex items-center"><link.icon /><span className='max-[1024px]:hidden'>&nbsp;&nbsp;&nbsp;{link.name}</span></span>
              </li>
            </Link>
            {idx === 5 ? <hr className="border-border" /> : <></>}
          </div>
        )
      }
      {
        session ? 
        <button onClick={async ()=> await signOut()} className='w-full'>
          <li className="w-full lg:px-4 px-2 py-2 my-2 hover:bg-white hover:rounded-md hover:drop-shadow-md hover:text-black">
            <span className="flex items-center"><FiLogOut /><span className='max-[1024px]:hidden'>&nbsp;&nbsp;&nbsp;Log out</span></span>
          </li>
        </button> : <></>
      }
    </ul>
  );
}

export default Navigation;