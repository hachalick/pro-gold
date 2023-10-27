import Link from "next/link";
import React from "react";
import { BsTelephoneOutboundFill } from "react-icons/bs";
import { BiLogoTelegram } from "react-icons/bi";
import { AiFillInstagram } from "react-icons/ai";
import { FaMobile } from "react-icons/fa";
import { ColorEnum } from "@/enum/color.enum";
import { FaLocationDot } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="flex justify-center bg-azure-200 pt-10">
      <div className="grid grid-cols-1 max-w-4xl w-screen px-4 md:grid-cols-4 2sm:grid-cols-2 [&>section]:mb-5">
        <section className="2sm:col-span-2">
          <ul className="grid grid-cols-2 [&>li]:border-b-2 [&>li]:border-dashed [&>li]:border-slate-400/50 [&>li]:ml-3 [&>li]:py-1 [&>li]:pr-3">
            <h3 className="text-xl font-medium mb-3 col-span-2">فروشگاه</h3>
            <li className="">
              <Link href="/shop/گوشواره">گوشواره</Link>
            </li>
            <li className="">
              <Link href="/shop/زنجیر">زنجیر</Link>
            </li>
            <li className="">
              <Link href="/shop/آویز">آویز</Link>
            </li>
            <li className="">
              <Link href="/shop/دستبند">دستبند</Link>
            </li>
            <li className="">
              <Link href="/shop/انگشتر">انگشتر</Link>
            </li>
            <li className="">
              <Link href="/shop/آویز-ساعت">آویز ساعت</Link>
            </li>
            <li className="">
              <Link href="/shop/سرویس">سرویس</Link>
            </li>
            <li className="">
              <Link href="/shop/نیمست">نیمست</Link>
            </li>
            <li className="">
              <Link href="/shop/پیرسینگ">پیرسینگ</Link>
            </li>
            <li className="">
              <Link href="/shop/پابند">پابند</Link>
            </li>
            <li className="">
              <Link href="/shop/گل-سینه">گل سینه</Link>
            </li>
          </ul>
        </section>
        <section>
          <ul className="[&>li]:border-b-2 [&>li]:border-dashed [&>li]:border-slate-400/50 [&>li]:pl-3 [&>li]:ml-3 [&>li]:py-1">
            <h3 className="text-xl font-medium mb-3">ارتباط با ما</h3>
            <li>
              <a href="https://t.me/jalalijewelery">
                <BiLogoTelegram
                  size={23}
                  color={ColorEnum["pennBlue-700"]}
                  className="ml-2 w-10 inline"
                />
                jalalijewelery
              </a>
            </li>
            <li>
              <a href="https://instagram.com/jalali_jewelery">
                <AiFillInstagram
                  size={24}
                  color={ColorEnum["pennBlue-700"]}
                  className="ml-2 w-10 inline"
                />
                jalali_jewelery
              </a>
            </li>
            <li>
              <a href="tel:02177619600">
                <BsTelephoneOutboundFill
                  size={18}
                  color={ColorEnum["pennBlue-700"]}
                  className="ml-2 w-10 inline"
                />
                ۰۲۱-۷۷۶۱۹۶۰۰
              </a>
            </li>
            <li>
              <a href="tel:09123790881">
                <FaMobile
                  size={22}
                  color={ColorEnum["pennBlue-700"]}
                  className="ml-2 w-10 inline"
                />
                ۰۹۱۲۳۷۹۰۸۸۱
              </a>
            </li>
          </ul>
        </section>
        <section>
          <h3 className="text-xl font-medium mb-3 ">لینک های مفید</h3>
          <ul className="[&>li]:border-b-2 [&>li]:border-dashed [&>li]:border-slate-400/50 [&>li]:ml-3 [&>li]:py-1 [&>li]:pr-3">
            <li>سوالات متداول</li>
            <li>نحوه خرید</li>
            <li>بلاگ</li>
            <li><Link href='price-board'>قیمت طلا و سکه</Link></li>
          </ul>
        </section>
        <section className="col-span-full">
          <address className="inline">
            آدرس:‌&ensp;تهران - بازار بزرگ - تکیه دولت - پاساژ تکیه دولت - طبقه
            دوم - واحد ۱۰۸
          </address>
        </section>
      </div>
    </footer>
  );
}
export default Footer;
