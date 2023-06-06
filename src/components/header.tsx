import Link from "next/link";
import { HeaderType } from "@/types";
import { GoChevronRight } from "react-icons/go"

interface Headers {
  headers: HeaderType[] | [];
}

const Header = ({ headers } : Headers) => {
  return (
    <header className="w-full text-black font-matter text-xl font-bold h-16 p-4 px-8 border-b border-b-grayback flex items-center">
      {
        headers.map((header, idx) => 
            idx === headers.length - 1 
              ?  header.name
              : <div className="text-normaltext flex items-center"><Link href={header.href}>{header.name}</Link>&nbsp;&nbsp;<GoChevronRight />&nbsp;&nbsp;</div>
        )
      }
    </header>
  )
}

export default Header;