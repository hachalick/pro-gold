import ContainerCardProducts from "@/components/ContainerCardProducts";
import Shop from "@/page/Shop";
import { ContainerCardProductHandler } from "@/utils/handler";
import React from "react";

async function getProductById(id: string) {
  const containerCardProductHandler = new ContainerCardProductHandler();
  const result = await containerCardProductHandler.findByIdProduct(id);
  return result;
}

async function getProducts(id: string) {
  const containerCardProductHandler = new ContainerCardProductHandler();
  const result = await containerCardProductHandler.findByIdProduct(id);
  return result;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: { id?: string };
}) {
  let data;
  if (searchParams?.id) {
    data = await getProductById(searchParams.id);
    if (data) {
      return (
        <div className="w-full min-h-[calc(100svh-56px)] flex items-center justify-center text-moonstone-200 ">
          <div className="flex items-center gap-3 flex-wrap p-3 bg-pennBlue-900 rounded-3xl m-3 basis-[700px] 1.5sm:text-2xl">
            <picture className="basis-[200px] flex justify-center items-center grow">
              <img
                src={`${process.env.BASE_URL}${data.path}`}
                alt={data.name}
                className="rounded-xl"
                loading="lazy"
              ></img>
            </picture>
            <ul className="w-fit">
              <li className="text-xl md:text-2xl font-semibold mt-3 text-moonstone-800">
                {data.name}
              </li>
              <li>
                <span className="text-moonstone-600">حدود وزن: </span>
                {data.minWeight.toLocaleString("fa-ir")} تا
                {data.maxWeight.toLocaleString("fa-ir")} گرم
              </li>
              <li>
                <span className="text-moonstone-600">اجرت: </span>
                {data.wage.toLocaleString("fa-ir")}%
              </li>
              <li>
                <span className="text-moonstone-600">رنگ های بکار رفته: </span>
                {data.color}
              </li>
              <li>
                <span className="text-moonstone-600">وضعیت: </span>
                {data.type}
              </li>
              <li>
                <span className="text-moonstone-600">سنگ: </span> {data.stone}</li>
              <li>
                <span className="text-moonstone-600">سایز: </span>
                {data.size.toLocaleString("fa-ir")} {data.typeSize}
              </li>

              {data.details && (
                <li>
                  <span className="text-moonstone-600">جزئیات: </span>
                  {data.details}
                </li>
              )}
            </ul>
          </div>
        </div>
      );
    }
  } else if (params.slug[0]) {
    console.log(params);
    return (
      <div>
        <div></div>
      </div>
    );
  }
  return;
}
