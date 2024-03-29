import Link from "next/link";

import { GoChevronRight } from "react-icons/go"
import { HeaderType } from "@/types/header.type";


interface Headers {
  headers: HeaderType[] | [];
}

const Header = ({ headers } : Headers) => {
  return (
    <header className="w-full text-black font-matter md:text-xl sm:text-base text-sm font-bold h-16 p-4 px-8 border-b border-b-grayback flex items-center">
      {
        headers.map((header, idx) => 
            idx === headers.length - 1 
              ?  header.name
              : <div className="text-normaltext flex items-center" key={`head-${idx}`}>
                  <Link href={header.href}>{header.name}</Link>&nbsp;&nbsp;<GoChevronRight />&nbsp;&nbsp;
                </div>
        )
      }
    </header>
  )
}

export default Header;