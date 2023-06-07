import { useState, useEffect } from "react";
import Navigation from "./navigation";
import { RxPaperPlane } from "react-icons/rx";
import { BiUser, BiBell } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoStatsChart } from "react-icons/io5";
import { FaRegStickyNote } from "react-icons/fa";

const Sidebar = () => {

  const links = [
    { href: 'dashboard', icon: RxPaperPlane, name: 'Dashboard' },
    { href: 'usermanage', icon: BiUser, name: 'User Management' },
    { href: 'analytics', icon: IoStatsChart, name: 'Analytics' },
    { href: 'disputes', icon: FaRegStickyNote, name: 'Disputes' },
    { href: 'notify', icon: BiBell, name: 'Push notification' },
    { href: 'setting', icon: FiSettings, name: 'Admin settings' }
  ]

  return (
    <nav className="bg-grayback text-sidetext w-80 h-full p-4 pt-10 font-inter drop-shadow-md fixed">
      <img className="h-8" src="mark.png" alt="" />
      <Navigation links={links} />
    </nav>
  )
}

export default Sidebar;