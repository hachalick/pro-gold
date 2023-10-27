"use client";
import { ChartActivateAdminPanel } from "@/components/ActivatePanel";
import React, { useEffect, useState } from "react";
import AdminCardContainerProduct from "@/components/Admin/AdminCardContainerProduct";
import AdminCardContainerTicket from "@/components/Admin/AdminCardContainerTicket";
import AdminCardContainerOrderStatus from "@/components/Admin/AdminCardContainerOrderStatus";
import AdminCardContainerOrders from "@/components/Admin/AdminCardContainerOrders";
import AdminCardContainerBlog from "@/components/Admin/AdminCardContainerBlog";
import AdminCardContainerUsers from "@/components/Admin/AdminCardContainerUsers";

export default function AdminPanel() {
  const [isClient, setClient] = useState(false);

  
  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div className="block">
      {isClient && <ChartActivateAdminPanel />}
      <div className="flex flex-wrap">
        <article className="grow basis-96">
          <section className="flex items-center justify-center flex-wrap max-x">
            <div className="bg-moonstone-400 rounded-2xl shadow-md shadow-azure h-24 flex flex-col justify-end items-center p-4 mx-3 mb-5 mt-2 grow">
              <h3 className="font-medium text-3xl my-auto">
                {new Intl.NumberFormat("fa-IR").format(232)}
              </h3>
              <h4>بلاگ</h4>
            </div>
            <div className="bg-moonstone-400 rounded-2xl shadow-md shadow-azure h-24 flex flex-col justify-end items-center p-4 mx-3 mb-5 mt-2 grow">
              <h3 className="font-medium text-3xl my-auto">
                {new Intl.NumberFormat("fa-IR").format(2)}
              </h3>
              <h4>سفارشات</h4>
            </div>
            <div className="bg-moonstone-400 rounded-2xl shadow-md shadow-azure h-24 flex flex-col justify-end items-center p-4 mx-3 mb-5 mt-2 grow">
              <h3 className="font-medium text-3xl my-auto">
                {new Intl.NumberFormat("fa-IR").format(2311)}
              </h3>
              <h4>محصولات</h4>
            </div>
            <div className="bg-moonstone-400 rounded-2xl shadow-md shadow-azure h-24 flex flex-col justify-end items-center p-4 mx-3 mb-5 mt-2 grow">
              <h3 className="font-medium text-3xl my-auto">
                {new Intl.NumberFormat("fa-IR").format(1232)}
              </h3>
              <h4>تیکت ها</h4>
            </div>
          </section>
          <section className="grid grid-cols-1 2md:grid-cols-2 gap-3 p-3 ">
            <AdminCardContainerProduct />
            <AdminCardContainerTicket />
            <AdminCardContainerOrders />
            <AdminCardContainerOrderStatus />
            <AdminCardContainerBlog />
            <AdminCardContainerUsers />
          </section>
        </article>
        <aside className="grow-0 w-56 bg-slate-500">
          <section>
            <h2></h2>
            <div>
              <div>ons: {new Intl.NumberFormat("fa-IR").format(10293810)}</div>
              <div>tala: 10293810</div>
              <div>seke: 10293810</div>
              <div>emami: 10293810</div>
            </div>
          </section>
          <section>users</section>
        </aside>
      </div>
    </div>
  );
}
