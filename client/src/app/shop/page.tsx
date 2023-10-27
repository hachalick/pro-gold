import Shop from "@/page/Shop";
import React from "react";

function Page({ searchParams }: { searchParams: { page: string } }) {
  return (
    <div>
      <Shop params={searchParams} />
    </div>
  );
}

export default Page;
