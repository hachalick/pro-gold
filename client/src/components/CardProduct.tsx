import { IProduct } from "@/interface/product.interface";
import React from "react";

function CardProduct(props: { data: IProduct }) {
  return (
    <div className="py-4 px-3 flex flex-col bg-pennBlue-900 text-zinc-100 justify-center items-center">
      <picture>
        <img
          src={`${process.env.BASE_URL}${props.data.path}`}
          alt={props.data.name}
          className="w-full h-56 object-cover"
          loading="lazy"
        ></img>
      </picture>
      <h2 className="text-xl font-semibold mt-3">{props.data.name}</h2>
    </div>
  );
}

export default CardProduct;
