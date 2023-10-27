import Image from "next/image";

function ColumImage() {
  return (
    <div className="flex justify-center">
      <div className="w-screen max-w-7xl 2sm:grid 2sm:grid-rows-[repeat(15,_minmax(0,_calc((120svh_-_20px)_/_16)))] 2sm:grid-cols-2 md:grid-rows-[repeat(8,_minmax(0,_calc((120svh_-_20px)_/_9)))] md:grid-cols-3 gap-3 mb-5 px-3">
        <Image
          className="mb-3 2sm:mb-0 rounded-3xl object-cover 2sm:h-full w-full 2sm:row-start-1 row-span-5  col-span-1 md:row-start-1 md:row-span-6 md:col-span-1"
          src="/images/a7109b9b8470345f0655c1e9dcddb462.jpg"
          alt=""
          width={200}
          height={350}
        />
        <Image
          className="mb-3 2sm:mb-0 rounded-3xl object-cover 2sm:h-full w-full 2sm:row-start-6 2sm:row-span-5 2sm:col-span-1 md:row-start-7 md:row-span-2 md:col-span-1"
          src="/images/a7109b9b8470345f0655c1e9dcddb462.jpg"
          alt=""
          width={200}
          height={350}
        />
        <Image
          className="mb-3 2sm:mb-0 rounded-3xl object-cover 2sm:h-full w-full 2sm:row-start-11 2sm:row-span-5 2sm:col-span-1 md:row-start-1 md:row-span-3 md:col-span-1"
          src="/images/f8b651f90859c718ad9eb2638e9359ea.jpg"
          alt=""
          width={200}
          height={350}
        />
        <Image
          className="mb-3 2sm:mb-0 rounded-3xl object-cover 2sm:h-full w-full 2sm:row-start-1 2sm:row-span-4 2sm:col-span-1 md:row-start-4 md:row-span-5 md:col-span-1"
          src="/images/f8b651f90859c718ad9eb2638e9359ea.jpg"
          alt=""
          width={200}
          height={350}
        />
        <Image
          className="mb-3 2sm:mb-0 rounded-3xl object-cover 2sm:h-full w-full 2sm:row-start-5 2sm:row-span-7 2sm:col-span-1 md:row-start-1 md:row-span-5 md:col-span-1"
          src="/images/fda2b5d7969e3542afb385f2ef337225.jpg"
          alt=""
          width={200}
          height={350}
        />
        <Image
          className="rounded-3xl object-cover 2sm:h-full w-full r2sm:ow-start-12 2sm:row-span-4 2sm:col-span-1 md:row-start-6 md:row-span-3 md:col-span-1"
          src="/images/a7109b9b8470345f0655c1e9dcddb462.jpg"
          alt=""
          width={200}
          height={350}
        />
      </div>
    </div>
  );
}

export default ColumImage;
