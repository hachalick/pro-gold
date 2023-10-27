"use client";
import React, { useCallback, useEffect, useState } from "react";
import { TbBasketSearch } from "react-icons/tb";
import { GoFilter } from "react-icons/go";
import CardProfileProducts from "@/components/CardProfileProducts";
import axios from "axios";
import { UrlsEnum } from "@/enum/urls.enum";
import {
  IProduct,
  IProductAdmin,
  IShowCategory,
} from "@/interface/product.interface";
import { EProductCategory } from "@/enum/product.enum";
import { FormListProductsHandler } from "@/utils/handler";

function FormListProduct() {
  /*------- states -------*/

  const [isShow, setShow] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<IShowCategory>({
    ANKLE: false,
    BRACELET: false,
    BROOCH: false,
    CHAIN: false,
    EARRING: false,
    HALF_SET: false,
    PENDANT: false,
    PIERCING: false,
    RING: false,
    WATCH_PENDING: false,
    SET: false,
  });
  const [listProducts, setListProducts] = useState<IProductAdmin[]>([]);
  const [listShowProducts, setShowListProducts] = useState<IProductAdmin[]>([]);

  /*------- handler -------*/

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter((val) => ({ ...val, [e.target.name]: e.target.checked }));
    },
    []
  );

  const onChangeHandler = useCallback((e: any) => {
    const value = e.target.value;
    setQuery(value);
  }, []);

  /*------- functions -------*/

  useEffect(() => {
    const data: IProductAdmin[] = [];
    let show = Object.keys(filter).filter(
      (key) => filter[key as keyof IShowCategory] === true
    );
    show = show.map(
      (key) => EProductCategory[key as keyof typeof EProductCategory]
    );
    listProducts.forEach((item) => {
      show.includes(item.category) && data.push(item);
    });
    show.length ? setShowListProducts(data) : setShowListProducts(listProducts);
  }, [
    filter.ANKLE,
    filter.BRACELET,
    filter.BROOCH,
    filter.CHAIN,
    filter.EARRING,
    filter.HALF_SET,
    filter.PENDANT,
    filter.PIERCING,
    filter.RING,
    filter.SET,
    filter.WATCH_PENDING,
  ]);

  const fetchProducts = useCallback(async (key: string) => {
    const formListProductsHandler = new FormListProductsHandler(
      setListProducts,
      setShowListProducts
    );
    return formListProductsHandler.getProduct(key);
  }, []);

  useEffect(() => {
    const data = async () => {
      await fetchProducts(query);
    };
    data();
  }, [query]);

  return (
    <>
      <form>
        <span className="flex items-center bg-white mx-3 my-2">
          <TbBasketSearch size={30} />
          <input
            type="text"
            value={query}
            className="w-full h-full bg-inherit"
            onChange={(e) => onChangeHandler(e)}
          />
        </span>
        <span className="flex flex-col bg-white mx-3 my-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShow((val) => !val);
            }}
          >
            <GoFilter size={30} />
          </button>
          <div
            className={`grid grid-cols-2 [&>label]:ml-3 [&>label>input]:ml-1 px-1 ${
              !isShow && "hidden"
            }`}
          >
            <label htmlFor="EARRING">
              <input
                type="checkbox"
                id="EARRING"
                name="EARRING"
                value="گوشواره"
                checked={filter.EARRING}
                onChange={(e) => changeHandler(e)}
              />
              گوشواره
            </label>
            <label htmlFor="CHAIN">
              <input
                type="checkbox"
                id="CHAIN"
                name="CHAIN"
                value="زنجیر"
                checked={filter.CHAIN}
                onChange={(e) => changeHandler(e)}
              />
              زنجیر
            </label>
            <label htmlFor="PENDANT">
              <input
                type="checkbox"
                id="PENDANT"
                name="PENDANT"
                value="آویز"
                checked={filter.PENDANT}
                onChange={(e) => changeHandler(e)}
              />
              آویز
            </label>
            <label htmlFor="BRACELET">
              <input
                type="checkbox"
                id="BRACELET"
                name="BRACELET"
                value="دستبند"
                checked={filter.BRACELET}
                onChange={(e) => changeHandler(e)}
              />
              دستبند
            </label>
            <label htmlFor="RING">
              <input
                type="checkbox"
                id="RING"
                name="RING"
                value="انگشتر"
                checked={filter.RING}
                onChange={(e) => changeHandler(e)}
              />
              انگشتر
            </label>
            <label htmlFor="SET">
              <input
                type="checkbox"
                id="SET"
                name="SET"
                value="سرویس"
                checked={filter.SET}
                onChange={(e) => changeHandler(e)}
              />
              سرویس
            </label>
            <label htmlFor="WATCH_PENDING">
              <input
                type="checkbox"
                id="WATCH_PENDING"
                name="WATCH_PENDING"
                value="آویز ساعت"
                checked={filter.WATCH_PENDING}
                onChange={(e) => changeHandler(e)}
              />
              آویز ساعت
            </label>
            <label htmlFor="HALF_SET">
              <input
                type="checkbox"
                id="HALF_SET"
                name="HALF_SET"
                value="نیمست"
                checked={filter.HALF_SET}
                onChange={(e) => changeHandler(e)}
              />
              نیمست
            </label>
            <label htmlFor="PIERCING">
              <input
                type="checkbox"
                id="PIERCING"
                name="PIERCING"
                value="پیرسینگ"
                checked={filter.PIERCING}
                onChange={(e) => changeHandler(e)}
              />
              پیرسینگ
            </label>
            <label htmlFor="ANKLE">
              <input
                type="checkbox"
                id="ANKLE"
                name="ANKLE"
                value="پابند"
                checked={filter.ANKLE}
                onChange={(e) => changeHandler(e)}
              />
              پابند
            </label>
            <label htmlFor="BROOCH">
              <input
                type="checkbox"
                id="BROOCH"
                name="BROOCH"
                value="گل سینه"
                checked={filter.BROOCH}
                onChange={(e) => changeHandler(e)}
              />
              گل سینه
            </label>
          </div>
        </span>
      </form>
      <div className="h-full mx-3 overflow-y-scroll mb-2">
        {listShowProducts?.length &&
          listShowProducts.map((properties, index) => (
            <CardProfileProducts data={properties} key={index} />
          ))}
      </div>
    </>
  );
}

export default FormListProduct;
