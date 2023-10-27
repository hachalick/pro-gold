import { CCategory, ICategory } from "@/constant/category.cont";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Category() {
  const categoryProp: ICategory = CCategory;
  return (
    <div className="flex justify-center bg-slate-200 mb-5">
      <div className="w-full max-w-7xl px-5 py-6">
        <h1 className="text-2xl font-bold mb-3">دسته بندی محصولات</h1>
        <div className="overflow-x-scroll overflow-y-hidden inline-flex snap-x snap-mandatory gap-4 w-full">
          {Object.keys(categoryProp).map((key, index) => (
            <Link
              key={index}
              href={`shop/${categoryProp[key as keyof ICategory].name}`}
            >
              <div className="group relative shrink-0 snap-center scroll-ml-6 w-80 h-64 pb-5 flex flex-col items-center bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-azureD-800 to-gold-700 mt-20 rounded-[60px_30px]">
                <div className="overflow-hidden absolute w-64 h-64 rounded-t-full mb-3 -translate-y-16 transition duration-150 ease-out hover:ease-in group-hover:-translate-y-20">
                  <Image
                    src={categoryProp[key as keyof ICategory].path}
                    alt={categoryProp[key as keyof ICategory].name}
                    width={400}
                    height={200}
                    className="scale-105 translate-y-2 w-64 h-64 bg-gray-900"
                    priority
                  />
                </div>
                <h2 className="text-xl font-medium mt-auto">
                  {categoryProp[key as keyof ICategory].name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
