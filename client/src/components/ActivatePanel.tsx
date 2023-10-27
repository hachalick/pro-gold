"use client";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Tooltip,
  YAxis,
  XAxis,
  AreaChart,
  Area,
} from "recharts";

export function ChartActivateAdminPanel() {
  const [w, setW] = useState(870);
  useEffect(()=> {
    setW(Math.max(window.innerWidth - 50, 870))
  }, [])
  const data = [
    {
      name: "فروردین",
      فروش: 2,
      سفارش: 5,
      کنسلی: 8,
    },
    {
      name: "اردیبهشت",
      فروش: 3,
      سفارش: 2,
      کنسلی: 2,
    },
    {
      name: "خرداد",
      فروش: 1,
      سفارش: 5,
      کنسلی: 3,
    },
    {
      name: "تیر",
      فروش: 5,
      سفارش: 2,
      کنسلی: 1,
    },
    {
      name: "مرداد",
      فروش: 2,
      سفارش: 1,
      کنسلی: 2,
    },
    {
      name: "شهریور",
      فروش: 5,
      سفارش: 2,
      کنسلی: 1,
    },
    {
      name: "مهر",
      فروش: 0,
      سفارش: 0,
      کنسلی: 0,
    },
    {
      name: "آبان",
      فروش: 0,
      سفارش: 0,
      کنسلی: 0,
    },
    {
      name: "آذر",
      فروش: 0,
      سفارش: 0,
      کنسلی: 0,
    },
    {
      name: "دی",
      فروش: 0,
      سفارش: 0,
      کنسلی: 0,
    },
    {
      name: "بهمن",
      فروش: 0,
      سفارش: 0,
      کنسلی: 0,
    },
    {
      name: "اسفند",
      فروش: 0,
      سفارش: 0,
      کنسلی: 0,
    },
  ];
  return (
    <div className="w-full overflow-x-auto overflow-y-hidden mt-2 px-5">
      <h2 className="text-lg font-semibold">گزارش فعالیت</h2>
      <AreaChart
        width={w}
        height={250}
        data={data}
        margin={{ top: 20, right: 40, left: 0, bottom: 0 }}
        className="w-32"
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a43a3d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#a43a3d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 5" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="فروش"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="سفارش"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        <Area
          type="monotone"
          dataKey="کنسلی"
          stroke="#a43a3d"
          fillOpacity={1}
          fill="url(#colorAmt)"
        />
      </AreaChart>
    </div>
  );
}

export function ChartActivateUserPanel() {
  return <div></div>;
}

export function ChartActivateBloggerPanel() {
  return <div></div>;
}
