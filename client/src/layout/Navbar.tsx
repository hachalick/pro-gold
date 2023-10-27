"use client";
import { ColorEnum } from "@/enum/color.enum";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RiAccountCircleFill } from "react-icons/ri";
import { BiRightArrowAlt } from "react-icons/bi";
import SLogo from "@/assets/icons/logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState("ثبت نام | ورود");
  function clickHandler() {
    setOpen(!open);
  }
  useEffect(() => {
    if (
      localStorage.getItem("access_token") &&
      localStorage.getItem("refresh_token") &&
      localStorage.getItem("panel")
    ) {
      setIsLogin(
        JSON.parse(localStorage.getItem("name") ?? "") ?? "ثبت نام | ورود"
      );
    }
  }, [isLogin]);
  return (
    <div className="bg-pennBlueD-100 h-14 flex px-2 justify-center sticky top-0 right-0 z-50">
      <button onClick={clickHandler}>
        <HiOutlineMenuAlt3 size={30} color={ColorEnum["moonstone-200"]} />
      </button>
      <Link href="/" className="mx-auto flex items-center">
        <SLogo size={40} className="fixed right-full left-full" />
      </Link>
      <Link href="/profile" className="flex items-center text-moonstone-200">
        <RiAccountCircleFill
          size={30}
          color={ColorEnum["moonstone-200"]}
          className="mx-2"
        />
        {isLogin}
      </Link>
      <Slider isOpen={open} setOpen={clickHandler} />
    </div>
  );
}

function Slider({ isOpen, setOpen }: { isOpen: boolean; setOpen: () => void }) {
  const a = isOpen
    ? "ease-in bg-slate-500/25 w-screen top-0 right-22"
    : "ease-in bg-slate-500/0 w-40 -right-56";
  return (
    <div
      className={`fixed z-10 transition duration-150 backdrop-blur-lg h-screen delay-100 ${a}`}
      onClick={setOpen}
    >
      <nav className="bg-pennBlueD-100 w-40 h-screen p-2 transition delay-100">
        <button onClick={setOpen}>
          <BiRightArrowAlt size={30} color={ColorEnum["moonstone-200"]} />
        </button>
        <ul>
          <li className="text-moonstone-700">
            <Link href="/">خانه</Link>
          </li>
          <li className="text-moonstone-700">
            <Link href="/shop">محصولات</Link>
            <ul>
              <li className="text-moonstone-700">
                <Link href="/shop/گوشواره">گوشواره</Link>
              </li>
              <li className="text-moonstone-700">
                <Link href="/shop/زنجیر">زنجیر</Link>
              </li>
              <li className="text-moonstone-700">
                <Link href="/shop/آویز">آویز</Link>
              </li>
              <li className="text-moonstone-700">
                <Link href="/shop/دستبند">دستبند</Link>
              </li>
              <li className="text-moonstone-700">
                <Link href="/shop/انگشتر">انگشتر</Link>
              </li>
              <li className="text-moonstone-700">
                <Link href="/shop/آویز-ساعت">آویز ساعت</Link>
              </li>
              <li className="text-moonstone-700">
                <Link href="/shop/سرویس">سرویس</Link>
              </li>
              <li className="text-moonstone-700">
                <Link href="/shop/نیمست">نیمست</Link>
              </li>
              <li className="text-moonstone-700">
                <Link href="/shop/پیرسینگ">پیرسینگ</Link>
              </li>
              <li className="text-moonstone-700">
                <Link href="/shop/پابند">پابند</Link>
              </li>
              <li className="text-moonstone-700">
                <Link href="/shop/گل-سینه">گل سینه</Link>
              </li>
              <li className="text-moonstone-700">
                <Link href="/contact-us">ارتباط با ما</Link>
              </li>
              <li className="text-moonstone-700">
                <Link href="/about-us">درباره با ما</Link>
              </li>
              <li className="text-moonstone-700">
                <Link href="/faq">سوالات متداول</Link>
              </li>
              <li
                className="text-moonstone-700"
                onClick={() => {
                  localStorage.removeItem("access_token");
                  localStorage.removeItem("refresh_token");
                  localStorage.removeItem("name");
                  localStorage.removeItem("panel");
                }}
              >
                <Link href="/">خروج از حساب کاربری</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
