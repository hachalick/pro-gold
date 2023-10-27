import axios from "axios";
import React from "react";
import Horizontal3d from "./Horizontal3d";

async function getData() {
  const res = [
    { id: "1", path: "/images/IMG_2266.jpg", name: "a" },
    { id: "2", path: "/images/IMG_2266.jpg", name: "s" },
    { id: "3", path: "/images/IMG_2266.jpg", name: "d" },
    { id: "4", path: "/images/IMG_2266.jpg", name: "f" },
    { id: "5", path: "/images/IMG_2266.jpg", name: "g" },
    { id: "6", path: "/images/IMG_2266.jpg", name: "h" },
    { id: "7", path: "/images/IMG_2266.jpg", name: "j" },
  ];
  return res;
}

async function TopNewest3d() {
  const data = await getData();
  return <Horizontal3d title="جدید ها" images={data}/>;
}

export default TopNewest3d;
