import Link from "next/link";
import React from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

function NavPages({
  numPages,
  curPage,
  className,
}: {
  numPages: number;
  curPage: number;
  className: string;
}) {
  function nextPage() {
    return Math.min(curPage + 1, numPages);
  }
  function beforePage() {
    return Math.max(curPage - 1, 1);
  }

  return (
    <div className={className}>
      {curPage > 1 && (
        <Link
          href={`/shop?page=${beforePage()}`}
          className="p-2 px-3 m-2 bg-pennBlue-900 text-moonstone-400 flex items-center rounded-lg"
        >
          <IoIosArrowDropright size={25} />
          <button className="mr-2">قبلی</button>
        </Link>
      )}
      {curPage < numPages && (
        <Link
          href={`/shop?page=${nextPage()}`}
          className="p-2 px-3 m-2 bg-pennBlue-900 text-moonstone-400 flex items-center rounded-lg"
        >
          <button className="ml-2">بعدی</button>
          <IoIosArrowDropleft size={25} />
        </Link>
      )}
    </div>
  );
}

export default NavPages;
