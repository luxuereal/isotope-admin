import { useState } from "react";
import Image from "next/image";
import { RxPaperPlane } from "react-icons/rx";
import { BiUser, BiBell } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoStatsChart } from "react-icons/io5";
import { FaRegStickyNote } from "react-icons/fa";
import { RxUpload } from 'react-icons/rx';
import Navigation from "./navigation";


const Sidebar = () => {

  const [links] = useState([
    { href: '/dashboard', icon: RxPaperPlane, name: 'Dashboard' },
    { href: '/usermanage', icon: BiUser, name: 'User Management' },
    { href: '/analytics', icon: IoStatsChart, name: 'Analytics' },
    { href: '/disputes', icon: FaRegStickyNote, name: 'Disputes' },
    { href: '/notify', icon: BiBell, name: 'Push notification' },
    { href: '/gifs', icon:RxUpload, name: 'Upload Gifs'},
    { href: '/setting', icon: FiSettings, name: 'Admin settings' }
  ])

  return (
    <nav className="bg-grayback text-sidetext lg:w-80 h-full lg:p-4 pt-10 font-inter drop-shadow-md fixed">
      <Image width="100" height="20" className="h-8 mt-10 w-auto max-[1024px]:hidden" src="/mark.png" alt="" />
      <Image width="32" height="32" className="m-1 h-6 w-auto lg:hidden" src="/favicon.svg" alt="" />
      <Navigation links={links} />
    </nav>
  )
}

export default Sidebar;