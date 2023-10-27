"use client";
import FormLogin from "@/components/FormLogin";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SLogo from "@/assets/icons/logo";

function Login() {
  const [roles, setRoles] = useState()
  useEffect(()=>{
    const role: any = localStorage.getItem("role")?.split(",") ?? null;
    role && setRoles(role);
  }, [])
  if (!roles){
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <div className="bg-moonstone-400 rounded-3xl flex flex-col items-center w-80 p-6 shadow-lg shadow-azure">
          <Link
            href="/"
            className="bg-pennBlueD-100 p-7 rounded-full mb-5 shadow-md shadow-pennBlue"
          >
            <SLogo size={100} className="translate-y-2" />
          </Link>
          <FormLogin />
        </div>
      </div>
    );
  }
}

export default Login;
