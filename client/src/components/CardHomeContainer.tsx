import Image from "next/image";
import Link from "next/link";
import React from "react";

function CardHomeContainer(props: {
  title: string;
  callToAction: string;
  path: string;
  link: string;
  description: string;
}) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-[minmax(150px,_1fr)_minmax(200px,_1fr)] md:grid-rows-[80px_minmax(300px,_1fr)] items-center relative mx-4 mb-5">
      <h2 className="text-2xl font-bold md:col-span-1 md:col-start-1">{props.title}</h2>
      <div className="w-[75vw] md:w-full h-[60vw] md:h-[80%]  absolute -z-10 mt-32 md:mt-0 rounded-t-full bg-moonstoneD-200 md:col-span-1 md:col-start-1"></div>
      <Image
        src={props.path}
        alt=""
        width={300}
        height={300}
        className="mt-4 w-[60vw] md:w-[85%] md:h-[90%] h-[65vw] rounded-t-full md:col-span-1 md:col-start-1 object-cover mx-auto md:mt-auto"
      />
      <div className="bg-pennBlue-900 flex flex-col items-end text-justify px-4 py-5 rounded-2xl">
        <p className="text-gray-100">{props.description}</p>
        <Link
          href={props.link}
          className="md:col-span-1 bg-forestGreenD-100 px-5 py-2 mt-3 ml-2 rounded-full text-moonstone-200 hover:text-moonstoneD-800 shadow-md hover:shadow-lg hover:bg-forestGreen-500 hover:shadow-forestGreen-900 shadow-forestGreen-900 "
        >
          {props.callToAction}
        </Link>
      </div>
    </div>
  );
}

export default CardHomeContainer;
