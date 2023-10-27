import Category from "@/components/Category";
import ContainerCardProducts from "@/components/ContainerCardProducts";
import React from "react";

function Shop({params}: {params: { page: string; }}) {
  return (
    <div>
      <Category />
      <ContainerCardProducts params={params}/>
    </div>
  );
}

export default Shop;
