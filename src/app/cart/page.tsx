"use client"

import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Product from "@/components/Product";
import SidebarFilter from "@/components/SidebarFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import viewCartList from "@/api/cart/viewCart.api";
import { CartProduct } from "@/types/entity/Cart";
import { useQuery } from "react-query";
import SEARCH_PARAMS from "@/constants/searchParams";
import ProductCart from "@/components/ProductCart";


export default function page() {
    const searchParams = useSearchParams();
    const supplierKeyword = "";
    const { data, isLoading, refetch } = useQuery<CartProduct[]>(
        ["cart", supplierKeyword],
        viewCartList,
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
            {data?.map((product: any, index) => (
              // eslint-disable-next-line react/jsx-key
              <ProductCart name={product.product.name} price={product.product.price} index={index} quantity={product.quantity} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
