import Image from "next/image";
import React from "react";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";

export default function Horizontal3d(props: {
  title: string;
  images: { path: string; id: string; name: string }[];
}) {
  return (
      <div className="flex justify-center w-full">
    <div className="relative w-full max-w-7xl px-5 mb-10">
      <h2 className="text-2xl font-bold">{props.title}</h2>
        <div className="flex overflow-x-scroll overflow-y-hidden  snap-x snap-mandatory [&>div]:mx-[5%] [&>div]:last:mx-0">
          <div className="shrink-0 w-[28vw]"></div>
          {props.images.map((image, index) => (
            <div
              key={index}
              className="scroll snap-center shrink-0 translate-y-2"
            >
              <Image
                src={image.path}
                width={300}
                height={350}
                alt={image.name}
                className="w-[65vw] h-[85vw] 2sm:w-[50vw] 2sm:h-[75vw] sm:w-[45vw] sm:h-[65vw] md:w-[32vw] md:h-[50vw] object-cover"
              ></Image>
            </div>
          ))}
          <div className="shrink-0 w-[28vw]"></div>
        </div>
        <span className="absolute h-[8vw] left-0 right-0 top-8 bg-[#edf9fb] rounded-b-[50%]"></span>
        <span className="absolute h-[8vw] left-0 right-0 -bottom-3 md:-bottom-8  bg-[#edf9fb] rounded-t-[50%] text-center pt-3 flex justify-center font-thin">
          <BiArrowFromLeft className="mx-1" />
          <span className="hidden md:block">shift + </span>scroll
          <BiArrowFromRight className="mx-1" />
        </span>
      </div>
    </div>
  );
}
