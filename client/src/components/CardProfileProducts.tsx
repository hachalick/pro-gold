"use client";
import { UrlsEnum } from "@/enum/urls.enum";
import { IProduct, IProductAdmin } from "@/interface/product.interface";
import { FetchData } from "@/services/api";
import { CardProfileProductsHandler } from "@/utils/handler";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiArrowFromTop } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

function CardProfileProducts(props: { data: IProductAdmin }) {
  const [isShow, setShow] = useState(false);
  const [isShowCard, setShowCard] = useState(false);
  const deleteProduct = useCallback(async () => {
    const cardProfileProductsHandler = new CardProfileProductsHandler(
      setShowCard
    );
    cardProfileProductsHandler.deleteHandlerById(props.data._id);
  }, []);
  useEffect(() => {
    Object.keys(props.data).length && setShowCard(true);
  }, []);
  if (isShowCard)
    return (
      <div className="flex bg-slate-100 relative mb-3">
        <div className="grow">
          <picture>
            <img
              src={`${process.env.BASE_URL}${props.data.path}`}
              alt={props.data.name}
              className="w-40"
              loading="lazy"
            ></img>
          </picture>
          <h3>{props.data.name}</h3>
          {isShow && (
            <ul>
              <li>وزن پایین: {props.data.minWeight} گرم</li>
              <li>وزن بالا: {props.data.maxWeight} گرم</li>
              <li>اجرت کیفی: {props.data.spreaderWages}%</li>
              <li>اجرت بنکدار: {props.data.wholesalerWages}%</li>
              <li>اجرت مغازه دار: {props.data.shopkeeperWages}%</li>
              <li>اجرت خانگی: {props.data.housewifeWages}%</li>
              <li>رنگ های بکار رفته: {props.data.color}</li>
              <li>وضعیت: {props.data.type}</li>
              <li>سنگ: {props.data.stone}</li>
              <li>دسته: {props.data.category}</li>
              <li>
                سایز: {props.data.size} {props.data.typeSize}
              </li>
              <li>تگ ها: {props.data.tags}</li>
            </ul>
          )}
        </div>
        <div className="flex flex-col items-center justify-center absolute top-2 left-2 gap-1">
          <button className="bg-amber-400 rounded-md p-1">
            <FiEdit size={25} />
          </button>
          <button
            className="bg-red-400 rounded-md p-1"
            onClick={() => deleteProduct()}
          >
            <AiOutlineDelete size={25} />
          </button>
          <button
            className="bg-teal-400 rounded-md p-1"
            onClick={() => setShow((val) => !val)}
          >
            <BiArrowFromTop size={25} />
          </button>
        </div>
      </div>
    );
}

export default CardProfileProducts;
