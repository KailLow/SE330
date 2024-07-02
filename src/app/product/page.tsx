"use client"

import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Product from "@/components/Product";
import SidebarFilter from "@/components/SidebarFilter";
import viewProductList from "@/api/product/viewProductList.api";
import SEARCH_PARAMS from "@/constants/searchParams";
import ProductPreview from "@/types/entity/ProductPreview";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "react-query";


export default function page() {
  
  const searchParams = useSearchParams();

  const category = searchParams.get(SEARCH_PARAMS.categoryName) || "";
  const productKeyword = searchParams.get(SEARCH_PARAMS.productName) || "";
  const price = searchParams.get(SEARCH_PARAMS.price) || "";
  const { data, isLoading, refetch } = useQuery<ProductPreview[]>(
    ["products", productKeyword, category, price],
    viewProductList,
    {
        retry: false,
    },
);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#eff1f2]">
      <Header />
      <div className="z-10 w-full items-center justify-between lg:flex mt-20">
        <div className=" flex justify-between w-full">
          <div className=" items-start border-gray-200 border rounded mx-5 shadow-xl">
            <SidebarFilter />
          </div>
          <div className=" flex gap-6 w-4/5">
            {/* <Product name="Laptop Asus ROG Zephyrus Duo 15 GX551QR-HB120T" price="80000000" /> */}
            {data?.map((product: any) => (
              // eslint-disable-next-line react/jsx-key
              <Product name={product.name} price={product.price} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
