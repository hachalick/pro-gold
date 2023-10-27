import { CPropImageConst } from "@/constant/product.cont";
import { CRegFloatEn, CRegFloatFa } from "@/constant/regex";
import { UrlsEnum } from "@/enum/urls.enum";
import { IClientProduct } from "@/interface/product.interface";
import { FormAddProductHandler } from "@/utils/handler";
import parseEnNum from "@/utils/parseEnNum";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

function FormAddProduct() {
  const defaultData: IClientProduct = {
    name: "",
    minWeight: "",
    maxWeight: "",
    shopkeeperWages: "",
    spreaderWages: "",
    wholesalerWages: "",
    housewifeWages: "",
    color: "زرد",
    type: "نو",
    stone: "",
    category: "گوشواره",
    size: "",
    typeSize: "سانتی متر",
    details: "",
    tags: "",
    path: "/icon-192x192.png",
  };
  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState<string>("");
  const [data, setData] = useState<IClientProduct>(defaultData);

  const onChangeHandler = useCallback((event: any) => {
    const formAddProductHandler = new FormAddProductHandler(
      event,
      setMessage,
      setFile,
      file,
      setData,
      data
    );
    formAddProductHandler.changeHandler();
  }, []);

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    const formAddProductHandler = new FormAddProductHandler(
      event,
      setMessage,
      setFile,
      file,
      setData,
      data
    );
    await formAddProductHandler.submitHandler(defaultData);
  };
  return (
    <div className="p-3 h-[88%]">
      <form
        encType="multipart/form-data"
        onSubmit={(e) => e.preventDefault()}
        className="h-[100%] flex flex-col justify-center items-center bg-slate-100"
      >
        <div className="flex flex-wrap w-full grow [&>label]:w-[50%] [&>label]:flex [&>label]:flex-col gap-3 overflow-y-scroll p-3 justify-center">
          <div>
            <picture className="w-full flex justify-center mb-4">
              <img
                src="/icon-192x192.png"
                alt="preview_image_product"
                id="previewImageProduct"
                className="w-full max-w-[130px] object-cover mb-2"
              />
            </picture>
            <label
              htmlFor="file_input_add_product"
              className="bg-moonstoneD-400/10 border border-moonstoneD-400 text-moonstoneD-400 rounded-lg text-center cursor-pointer p-3 py-2 mb-2 mx-2"
            >
              بارگذاری تصویر
            </label>
          </div>

          <label className="grow basis-56" htmlFor="name">
            نام
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          </label>
          <label className="grow basis-56" htmlFor="minWeight">
            وزن پایین
            <input
              type="text"
              id="minWeight"
              name="minWeight"
              value={data.minWeight}
              onChange={onChangeHandler}
              inputMode="numeric"
              required
            />
          </label>
          <label className="grow basis-56" htmlFor="maxWeight">
            وزن بالا
            <input
              type="text"
              id="maxWeight"
              name="maxWeight"
              value={data.maxWeight}
              onChange={onChangeHandler}
              inputMode="numeric"
              required
            />
          </label>
          <label className="grow basis-56" htmlFor="spreaderWages">
            اجرت - کیفی
            <input
              type="text"
              id="spreaderWages"
              name="spreaderWages"
              value={data.spreaderWages}
              onChange={onChangeHandler}
              inputMode="numeric"
              required
            />
          </label>
          <label className="grow basis-56" htmlFor="wholesalerWages">
            اجرت - بنکدار
            <input
              type="text"
              id="wholesalerWages"
              name="wholesalerWages"
              value={data.wholesalerWages}
              onChange={onChangeHandler}
              inputMode="numeric"
              required
            />
          </label>
          <label className="grow basis-56" htmlFor="shopkeeperWages">
            اجرت - ویترین
            <input
              type="text"
              id="shopkeeperWages"
              name="shopkeeperWages"
              value={data.shopkeeperWages}
              onChange={onChangeHandler}
              inputMode="numeric"
              required
            />
          </label>
          <label className="grow basis-56" htmlFor="housewifeWages">
            اجرت - مشتری
            <input
              type="text"
              id="housewifeWages"
              name="housewifeWages"
              value={data.housewifeWages}
              onChange={onChangeHandler}
              inputMode="numeric"
              required
            />
          </label>
          <label className="grow basis-56" htmlFor="color">
            رنگ(ها)
            <select
              id="color"
              name="color"
              value={data.color}
              onChange={onChangeHandler}
            >
              <option>زرد</option>
              <option>سفید</option>
              <option>رز</option>
              <option>رز - زرد</option>
              <option>رز - سفید</option>
              <option>سفید - زرد</option>
              <option>رز - سفید - زرد</option>
            </select>
          </label>
          <label className="grow basis-56" htmlFor="type">
            وضعیت
            <select
              id="type"
              name="type"
              value={data.type}
              onChange={onChangeHandler}
            >
              <option>نو</option>
              <option>کارکرده</option>
            </select>
          </label>
          <label className="grow basis-56" htmlFor="stone">
            سنگ
            <input
              type="text"
              name="stone"
              id="stone"
              value={data.stone}
              onChange={onChangeHandler}
              required
            />
          </label>
          <label className="grow basis-56" htmlFor="category">
            دسته
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option>گوشواره</option>
              <option>زنجیر</option>
              <option>آویز</option>
              <option>دستبند</option>
              <option>انگشتر</option>
              <option>آویز ساعت</option>
              <option>سرویس</option>
              <option>نیمست</option>
              <option>پیرسینگ</option>
              <option>پابند</option>
              <option>گل سینه</option>
            </select>
          </label>
          <label className="grow basis-56" htmlFor="size">
            اندازه
            <input
              type="text"
              name="size"
              id="size"
              value={data.size}
              onChange={onChangeHandler}
              inputMode="numeric"
              required
            />
          </label>
          <label className="grow basis-56 " htmlFor="typeSize">
            واحد اندازه
            <select
              id="typeSize"
              name="typeSize"
              value={data.typeSize}
              onChange={onChangeHandler}
            >
              <option>حلقه</option>
              <option>سانتی متر</option>
            </select>
          </label>
          <label className="grow basis-56 w-full" htmlFor="tags">
            تگ
            <textarea
              name="tags"
              id="tags"
              value={data.tags}
              rows={2}
              className="resize-none"
              onChange={onChangeHandler}
              spellCheck="false"
            ></textarea>
          </label>
          <label className="grow basis-56 w-full" htmlFor="details">
            توضیحات تکمیلی
            <textarea
              name="details"
              id="details"
              value={data.details}
              rows={5}
              className="resize-none"
              onChange={onChangeHandler}
              spellCheck="false"
            ></textarea>
          </label>
        </div>
        <div className="flex flex-wrap justify-center items-center p-2">
          <span className="text-red-600 m-1">{message}</span>
        </div>
        <div className="flex flex-wrap">
          <input
            id="file_input_add_product"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            name="product_img"
            onChange={onChangeHandler}
            required
            hidden
          />
          <button
            type="submit"
            className="bg-moonstoneD-400 text-moonstone-200 rounded-lg text-center cursor-pointer p-3 py-2 mb-2 mx-2"
            onClick={(e) => onSubmitHandler(e)}
          >
            ثبت کالا
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormAddProduct;
