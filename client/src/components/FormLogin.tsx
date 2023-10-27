"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import toast, { Toaster } from "react-hot-toast";
import { UrlsEnum } from "@/enum/urls.enum";

export default function FormLogin() {
  const [isLoading, setLoading] = useState(true);
  const [canSignUp, setCanSignUp] = useState(false);
  const [data, setData] = useState({
    val1: "",
    val2: "",
    val3: "",
    name: "",
    password: "",
  });
  const [otpCode, setOtp] = useState({
    val1: "",
    val2: "",
    val3: "",
    val4: "",
    val5: "",
    val6: "",
  });
  const [expires, setExpires] = useState(0);
  const [res, setRes] = useState({
    message: "",
    status: 0,
    existing: null,
  });
  const router = useRouter();
  useEffect(() => {
    if (
      localStorage.getItem("access_token") &&
      localStorage.getItem("refresh_token")
    ) {
      router.push("/profile");
    }
    setLoading(false);
    if (expires) {
      const a: NodeJS.Timer = setInterval(() => {
        setExpires((val) => val - 1);
      }, 1000);
    }
  }, [res.existing]);

  function changeAddHandler(e: any, idA: string, idB: string) {
    const valueClick: string = e.nativeEvent.data;
    if (valueClick === null) {
      setOtp((value) => ({ ...value, [e.target.name]: "" }));
      document.getElementById(idB)?.focus();
    } else if (/^[0-9]$/.test(valueClick) && e.target.value.length === 1) {
      setOtp((value) => ({ ...value, [e.target.name]: e.target.value }));
    } else if (/^[0-9]$/.test(valueClick) && e.target.value.length > 1) {
      const a: any = document.getElementById(idA);
      document.getElementById(idA)?.focus();
      setOtp((value) => ({ ...value, [a.name]: valueClick }));
    }
  }

  async function changeHandler(e: any, idA: string, idB: string) {
    if (
      e.target.name === "val1" &&
      e.target.value.length <= 2 &&
      /^[0-9]{0,}$/.test(e.target.value)
    ) {
      setData((value) => ({ ...value, val1: e.target.value }));
    } else if (
      e.target.name === "val1" &&
      e.target.value.length > 2 &&
      /^[0-9]{0,}$/.test(e.target.value)
    ) {
      setData((value) => ({ ...value, val2: e.nativeEvent.data }));
      document.getElementById(idA)?.focus();
    } else if (
      e.target.name === "val2" &&
      e.target.value.length <= 3 &&
      /^[0-9]{0,}$/.test(e.target.value)
    ) {
      setData((value) => ({ ...value, val2: e.target.value }));
    } else if (
      e.target.name === "val2" &&
      e.target.value.length > 3 &&
      /^[0-9]{0,}$/.test(e.target.value)
    ) {
      setData((value) => ({ ...value, val3: e.nativeEvent.data }));
      document.getElementById(idA)?.focus();
    } else if (
      e.target.name === "val3" &&
      e.target.value.length <= 4 &&
      /^[0-9]{0,}$/.test(e.target.value)
    ) {
      setData((value) => ({ ...value, val3: e.target.value }));
    } else if (e.target.name === "name" && e.target.value.length <= 35) {
      if (/^[\u0600-\u06FF| ]{0,}$/.test(e.target.value)) {
        setData((value) => ({ ...value, name: e.target.value }));
      } else {
        toast.error("زبان نوشتار را فارسی کنید");
      }
    } else if (e.target.name === "password") {
      if (
        /^([a-zA-Z])(\w|#|&|%|@|\$){0,}$/.test(e.target.value) ||
        e.target.value === ""
      ) {
        setData((value) => ({ ...value, password: e.target.value }));
      } else if (!/^([a-zA-Z]){0,}/.test(e.target.value)) {
        toast.error("حرف اول را انگلیسی بگذارید");
      } else if (!/^([a-zA-Z0-9]|#|&|%|@|\$)$/.test(e.nativeEvent.data)) {
        toast.error("از حروف انگلیسی و نماد های # & % @ $\nاستفاده کنید");
      } else {
        toast.error("زبان نوشتار را انگلیسی کنید");
      }
    }
    if (
      data.val1.length === 2 &&
      data.val2.length === 3 &&
      data.val3.length === 3 &&
      e.target.name === "val3"
    ) {
      const mobile = `09${data.val1}${data.val2}${data.val3}${e.nativeEvent.data}`;
      let can: boolean = false;
      if (mobile.length === 11) {
        can = await canSignIn({ mobile });
      }
      setCanSignUp(can);
      if (!can && mobile.length === 11) {
        setOtp({ val1: "", val2: "", val3: "", val4: "", val5: "", val6: "" });
        const { status, message, data } = await getOtp({ mobile });
        if (data) {
          setRes({ message, status, existing: data.existing });
          const limit = data.expires * 60;
          setExpires(limit);
        } else {
          setRes((value) => ({ ...value, status, message }));
        }
      }
    }
    if (e.nativeEvent.data === null && e.target.value.length === 0) {
      document.getElementById(idB)?.focus();
    }
  }

  async function submitHandler(
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setOtp({ val1: "", val2: "", val3: "", val4: "", val5: "", val6: "" });
    const mobile = `09${data.val1}${data.val2}${data.val3}`;
    if (mobile.length === 11) {
      const { status, message, data } = await getOtp({ mobile });
      if (data) {
        setRes({ message, status, existing: data.existing });
        const limit = data.expires * 60;
        setExpires(limit);
      } else {
        setRes((value) => ({ ...value, status, message }));
      }
    }
  }
  async function submitOtpHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const mobile = `09${data.val1}${data.val2}${data.val3}`;
    const otp: string = `${otpCode.val1}${otpCode.val2}${otpCode.val3}${otpCode.val4}${otpCode.val5}${otpCode.val6}`;
    const response = await login({
      mobile,
      otp,
      existing: res.existing,
      name: data.name,
      password: data.password,
    });
    const { message, status, data: tokens } = response;
    if (status === 201) {
      localStorage.setItem(
        "access_token",
        JSON.stringify(tokens?.access_token)
      );
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(tokens?.refresh_token)
      );
      localStorage.setItem("name", JSON.stringify(tokens?.name));
      localStorage.setItem("panel", JSON.stringify(tokens?.panel));
      router.push("/");
    }
  }
  if (isLoading) {
    return (
      <section>
        <Spinner />
      </section>
    );
  } else if (res.status === 0 || res.status === 400) {
    return (
      <form
        className="flex flex-col items-center px-3 py-5 rounded-xl shadow-md shadow-azure bg-moonstone-300 w-72"
        onSubmit={(e) => submitHandler(e)}
      >
        <Toaster position="bottom-left" reverseOrder={false} />
        <label
          htmlFor="mobile"
          className="mb-3 flex flex-col items-start w-full pl-4"
        >
          <h2 className="font-medium">شماره موبایل:</h2>
          <span dir="ltr" className=" mt-3 text-lg ml-auto">
            <span>09</span>
            <input
              autoFocus
              autoComplete="off"
              value={data.val1}
              id="text1"
              name="val1"
              type="text"
              inputMode="numeric"
              className="w-7 mx-1 text-center focus:outline-1 outline-slate-400"
              onChange={(e) => changeHandler(e, "text2", "text1")}
            />
            <input
              autoComplete="off"
              value={data.val2}
              id="text2"
              name="val2"
              type="text"
              inputMode="numeric"
              className="w-9 mx-1 text-center focus:outline-1 outline-slate-400"
              onChange={(e) => changeHandler(e, "text3", "text1")}
            />
            <input
              autoComplete="off"
              value={data.val3}
              id="text3"
              name="val3"
              type="text"
              inputMode="numeric"
              className="w-11 mx-1 text-center focus:outline-1 outline-slate-400"
              onChange={(e) => changeHandler(e, "text4", "text2")}
            />
          </span>
          <span className="text-red-500 mt-3 font-light">{res.message}</span>
        </label>
        {canSignUp && (
          <>
            <label
              htmlFor="name"
              className="mb-3 flex flex-col items-start w-full pl-4"
            >
              <h2 className="font-medium">نام و نام خانوادگی:</h2>
              <input
                autoComplete="off"
                required
                value={data.name}
                id="text4"
                name="name"
                type="text"
                className="text-center focus:outline-1 outline-slate-400 mt-3 text-lg mr-auto"
                onChange={(e) => changeHandler(e, "text5", "text4")}
              />
            </label>
            <label
              htmlFor="name"
              className="mb-3 flex flex-col items-start w-full pl-4"
            >
              <h2 className="font-medium">رمز عبور:</h2>
              <input
                autoComplete="off"
                required
                value={data.password}
                id="text5"
                name="password"
                type="password"
                className="text-center focus:outline-1 outline-slate-400 mt-3 text-lg mr-auto"
                onChange={(e) => changeHandler(e, "btn1", "text5")}
              />
            </label>
            <button
              id="btn1"
              type="submit"
              className="bg-moonstoneD-400 text-moonstone-200 rounded-lg py-2 w-[calc(100%-40px)] mt-3"
            >
              ثبت نام
            </button>
          </>
        )}
      </form>
    );
  } else {
    return (
      <form
        className="flex flex-col items-center px-3 py-5 rounded-xl shadow-md shadow-azure bg-moonstone-300 w-72"
        onSubmit={submitOtpHandler}
      >
        <Toaster />
        <label
          htmlFor="mobile"
          className="mb-3 flex flex-col justify-start w-[100%]"
        >
          <span className="font-medium">کد احراز هویت:</span>
          <span dir="ltr" className="mt-3 mr-4 text-lg flex justify-center">
            <input
              autoFocus
              required
              autoComplete="off"
              value={otpCode.val1}
              id="text1"
              name="val1"
              type="text"
              inputMode="numeric"
              className="w-5 mx-1 text-center focus:outline-1 outline-slate-400"
              onChange={(e) => changeAddHandler(e, "text2", "text1")}
            />
            <input
              autoComplete="off"
              required
              value={otpCode.val2}
              id="text2"
              name="val2"
              type="text"
              inputMode="numeric"
              className="w-5 mx-1 text-center focus:outline-1 outline-slate-400"
              onChange={(e) => changeAddHandler(e, "text3", "text1")}
            />
            <input
              autoComplete="off"
              required
              value={otpCode.val3}
              id="text3"
              name="val3"
              type="text"
              inputMode="numeric"
              className="w-5 mx-1 text-center focus:outline-1 outline-slate-400"
              onChange={(e) => changeAddHandler(e, "text4", "text2")}
            />
            <input
              autoComplete="off"
              required
              value={otpCode.val4}
              id="text4"
              name="val4"
              type="text"
              inputMode="numeric"
              className="w-5 mx-1 text-center focus:outline-1 outline-slate-400"
              onChange={(e) => changeAddHandler(e, "text5", "text3")}
            />
            <input
              autoComplete="off"
              required
              value={otpCode.val5}
              id="text5"
              name="val5"
              type="text"
              inputMode="numeric"
              className="w-5 mx-1 text-center focus:outline-1 outline-slate-400"
              onChange={(e) => changeAddHandler(e, "text6", "text4")}
            />
            <input
              autoComplete="off"
              required
              value={otpCode.val6}
              id="text6"
              name="val6"
              type="text"
              inputMode="numeric"
              className="w-5 mx-1 text-center focus:outline-1 outline-slate-400"
              onChange={(e) => changeAddHandler(e, "btn1", "text5")}
            />
          </span>
          <span
            className={`mt-3 font-light ${
              (parseInt(`${res.status / 100}`) === 4 ||
                parseInt(`${res.status / 100}`) === 5) &&
              "text-red-600"
            }`}
          >
            {res.message}
          </span>
        </label>
        {expires > 0 && Math.floor(expires / 60) + ":" + (expires % 60)}
        <button
          id="btn1"
          type="submit"
          className="bg-moonstoneD-400 text-moonstone-200 rounded-lg py-2 w-[calc(100%-40px)] mt-3"
        >
          {res.existing ? "ورود" : "ثبت نام"}
        </button>
        <button
          id="btn1"
          type="button"
          className="bg-moonstoneD-400/5 border border-moonstoneD-400 text-moonstoneD-400 rounded-lg py-2 w-[calc(100%-40px)] mt-3"
          onClick={(e) => submitHandler(e)}
        >
          ارسال مجدد
        </button>
      </form>
    );
  }
}

async function canSignIn({ mobile }: { mobile: string }): Promise<boolean> {
  const url = `${process.env.BASE_URL}${UrlsEnum.CAN_SIGN_UP}`;
  try {
    const res = await axios.get(url, { params: { mobile } });
    return res.data;
  } catch (error: any) {
    return false;
  }
}

async function getOtp({ mobile }: { mobile: string }) {
  const url = `${process.env.BASE_URL}${UrlsEnum.OTP}`;
  try {
    const res = await axios.post(url, { mobile });
    return { ...res?.data, status: res.status };
  } catch (error: any) {
    return {
      message: error.response?.data.message,
      status: error.response?.data.statusCode,
    };
  }
}

async function login({
  mobile,
  otp,
  existing,
  name,
  password,
}: {
  mobile: string;
  otp: string;
  existing: boolean | null;
  name?: string;
  password?: string;
}) {
  const url = `${process.env.BASE_URL}${UrlsEnum.LOGIN}`;
  if (mobile.length !== 11) return;
  try {
    if (existing) {
      const res = await axios.post(url, { mobile, otp });
      return { ...res?.data, status: res.status };
    } else {
      const res = await axios.post(url, { mobile, otp, name, password });
      return { ...res?.data, status: res.status };
    }
  } catch (error: any) {
    return { ...error.response?.data, status: error.response?.data.statusCode };
  }
}
