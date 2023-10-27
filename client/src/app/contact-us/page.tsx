import { BsTelephoneOutboundFill } from "react-icons/bs";
import { BiLogoTelegram } from "react-icons/bi";
import { AiFillInstagram } from "react-icons/ai";
import { FaMobile } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { ColorEnum } from "@/enum/color.enum";

function ContactUs() {
  return (
    <div className="flex flex-col m-3 p-2 rounded-xl shadow-md shadow-azure bg-moonstone-300">
      <h1 className="text-2xl mb-5 font-medium">ارتباط با طلا جلالی</h1>
      <a
        href="https://t.me/jalalijewelery"
        className="mb-2 pb-2 border-slate-400/50 border-dashed border-b-2"
      >
        <BiLogoTelegram
          size={30}
          color={ColorEnum["pennBlue-700"]}
          className="ml-2 w-10 inline"
        />
        تلگرام:&ensp;jalalijewelery
      </a>
      <a
        href="https://instagram.com/jalali_jewelery"
        className="mb-2 pb-2 border-slate-400/50 border-dashed border-b-2"
      >
        <AiFillInstagram
          size={30}
          color={ColorEnum["pennBlue-700"]}
          className="ml-2 w-10 inline"
        />
        اینستاگرام:&ensp;jalali_jewelery
      </a>
      <a
        href="tel:02177619600"
        className="mb-2 pb-2 border-slate-400/50 border-dashed border-b-2"
      >
        <BsTelephoneOutboundFill
          size={24}
          color={ColorEnum["pennBlue-700"]}
          className="ml-2 w-10 inline"
        />
        شماره تماس:&ensp;<span dir="rtl">۰۲۱-۷۷۶۱۹۶۰۰</span>
      </a>
      <a
        href="tel:09123790881"
        className="mb-2 pb-2 border-slate-400/50 border-dashed border-b-2"
      >
        <FaMobile
          size={30}
          color={ColorEnum["pennBlue-700"]}
          className="ml-2 w-10 inline"
        />
        شماره همراه:&ensp;<span>۰۹۱۲۳۷۹۰۸۸۱</span>
      </a>
      <address className="">
        <FaLocationDot
          size={30}
          color={ColorEnum["pennBlue-700"]}
          className="ml-2 w-10 inline"
        />
        آدرس:‌ تهران - بازار بزرگ - تکیه دولت - پاساژ تکیه دولت - طبقه دوم -
        واحد ۱۰۸
      </address>
    </div>
  );
}

export default ContactUs;
