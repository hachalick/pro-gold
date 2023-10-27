import { ContainerCardProductsHandler } from "@/utils/handler";
import CardProduct from "./CardProduct";
import Link from "next/link";
import NavPages from "./NavPages";

async function getData(key: string = "", page: number = 1) {
  const number = 30;
  const containerCardProductsHandler = new ContainerCardProductsHandler();
  const result = await containerCardProductsHandler.getListProduct(key);
  const res = [];
  const lengthResult = result?.length ?? 0;
  const NumberPages = Math.ceil(lengthResult / number);
  if (result)
    for (
      let i = (page - 1) * number;
      i < page * number && i < lengthResult;
      i++
    ) {
      res.push(result[i]);
    }
  return { res, NumberPages };
}

export default async function ContainerCardProducts({
  params,
}: {
  params: { page: string };
}) {
  const page = parseInt(params.page) || 1;
  const data = await getData("", page);
  return (
    <div className="flex flex-col justify-center items-center">
      <NavPages
        numPages={data.NumberPages}
        curPage={page}
        className="flex bg-slate-200 grow justify-center"
      />
      <div className="min-h-screen w-full max-w-7xl flex justify-center">
        <div className="flex w-full flex-wrap gap-3 mb-auto ">
          {data &&
            data.res.map((product, index) => (
              <Link
                key={index}
                href={`/shop/${decodeURI(product.category)}/${decodeURI(
                  product.name
                )}/${decodeURI(product.color)}?id=${decodeURI(product._id)}`}
                className="grow basis-56"
              >
                <CardProduct data={product} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
