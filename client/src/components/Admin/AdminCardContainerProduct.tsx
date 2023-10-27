"use client";
import React, { useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import FormAddProduct from "../FormAddProduct";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { ColorEnum } from "@/enum/color.enum";
import FormListProduct from "../FormListProduct";

function AdminCardContainerProduct() {
  const [showPro, setPro] = useState(false);
  return (
    <div className="bg-moonstoneD-200/50 rounded-2xl pb-3 h-[600px] flex flex-col">
      <h2 className="text-moonstone-200 bg-pennBlueD-100 px-3 py-2 rounded-t-2xl">
        محصولات
      </h2>
      {showPro ? <FormAddProduct /> : <FormListProduct />}
      <button
        className={`flex ${
          showPro ? "bg-red-200" : "bg-forestGreen-200"
        } px-3 py-1 rounded-lg  w-fit mx-auto`}
        onClick={() => setPro((val) => !val)}
      >
        {showPro ? (
          <>
            <AiOutlineCloseSquare size={25} color={"#dc2626"} />
            <span className="px-2">انصراف</span>
          </>
        ) : (
          <>
            <FiPlusSquare size={25} color={ColorEnum["forestGreen-900"]} />
            <span className="px-2">ساخت</span>
          </>
        )}
      </button>
    </div>
  );
}

export default AdminCardContainerProduct;
