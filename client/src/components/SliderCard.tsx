"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function SliderCard() {
  const [sizeImg, setSizeImg] = useState({ width: 100, height: 80 });
  const styleTop =
    "bg-gray-900 w-[calc(100vw-30px)] h-[calc(100%-15px)] sm:w-[calc(100vw-100px)] sm:h-[calc(100%-100px)] absolute rounded-3xl object-cover z-[1] opacity-100 animate-moveTopCardBanner";
  const styleUnder =
    "bg-gray-900 w-[calc(100vw-30px)] h-[calc(100%-15px)] sm:w-[calc(100vw-100px)] sm:h-[calc(100%-100px)] absolute rounded-3xl object-cover z-[0] opacity-100 animate-moveDownCardBanner";
  const styleBase =
    "bg-gray-900 w-[calc(100vw-30px)] h-[calc(100%-15px)] sm:w-[calc(100vw-100px)] sm:h-[calc(100%-100px)] absolute rounded-3xl object-cover -z-[1] opacity-0";
  let page = 0;
  const [style1, setStyle1] = useState(styleTop);
  const [style2, setStyle2] = useState(styleUnder);
  const [style3, setStyle3] = useState(styleBase);
  const zIndexHandler = () => {
    if (page === 0) {
      setStyle1(styleTop);
      setStyle2(styleUnder);
      setStyle3(styleBase);
    } else if (page === 1) {
      setStyle1(styleBase);
      setStyle2(styleTop);
      setStyle3(styleUnder);
    } else if (page === 2) {
      setStyle1(styleUnder);
      setStyle2(styleBase);
      setStyle3(styleTop);
      page = -1;
    }
    page++;
  };
  useEffect(() => {
    setSizeImg({ width: 400, height: 300 });
    zIndexHandler();
    setInterval(() => {
      zIndexHandler();
    }, 6000);
  }, []);
  return (
    <div className="h-[70svw] py-24 sm:h-[calc(100svh-56px)] overflow-hidden relative flex items-center justify-center">
      <Image
        src="/images/IMG_2255.JPG"
        alt="Image Card"
        width={sizeImg.width}
        height={sizeImg.height}
        className={style1}
        priority
      />
      <Image
        src="/images/IMG_2257.JPG"
        alt="Image Card"
        width={sizeImg.width}
        height={sizeImg.height}
        className={style2}
        priority
      />
      <Image
        src="/images/IMG_2279.JPG"
        alt="Image Card"
        width={sizeImg.width}
        height={sizeImg.height}
        className={style3}
        priority
      />
    </div>
  );
}

export default SliderCard;
