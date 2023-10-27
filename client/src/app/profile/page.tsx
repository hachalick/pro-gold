"use client";
import { PanelEnum } from "@/enum/role.enum";
import AdminPanel from "@/page/AdminPanel";
import Login from "@/page/Login";
import UserPanel from "@/page/UserPanel";
import React, { useEffect, useState } from "react";

function Profile() {
  const [panel, setPanel] = useState("login");
  useEffect(() => {
    const panel: string = localStorage.getItem("panel")
      ? JSON.parse(localStorage.getItem("panel") ?? "")
      : "login";
    setPanel(panel);
    return () => {};
  }, []);
  if (panel.includes("login")) return <Login />;
  else if (panel.includes(PanelEnum.ADMIN)) return <AdminPanel />;
  else if (panel.includes(PanelEnum.MEMBER)) return <UserPanel />;
}

export default Profile;
