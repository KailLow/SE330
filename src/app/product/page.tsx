import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Product from "@/components/Product";
import SidebarFilter from "@/components/SidebarFilter";
import Category, { createCategory } from "@/types/entity/Category";
import Supplier, { createSupplier } from "@/types/entity/Supplier";

//fake data

const categories: Category[] = [
  createCategory('Laptop', '1'),
  createCategory('Clothing', '2'),
  createCategory('Books', '3'),
  createCategory('Home & Garden', '4'),
  createCategory('Sports & Outdoors', '5'),
];

const suppliers: Supplier[] = [
  createSupplier(
    'Lenovo',
    '555-1234',
    'info@lenovo.com',
    '123 Main St, Anytown USA',
    '1'
  ),
  createSupplier(
    'Dell',
    '555-5678',
    'sales@dell.com',
    '456 Oak Rd, Anytown USA',
    '2'
  ),
  createSupplier(
    'HP',
    '555-9012',
    'support@hp.com',
    '789 Maple Ln, Anytown USA',
    '3'
  ),
  createSupplier(
    'Acer',
    '555-3456',
    'contact@acer.com',
    '321 Elm St, Anytown USA',
    '4'
  ),
  createSupplier(
    'Asus',
    '555-7890',
    'info@asus.com',
    '654 Oak Blvd, Anytown USA',
    '5'
  )
];
//dong

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#eff1f2]">
      <Header />
      <div className="z-10 w-full items-center justify-between lg:flex mt-20">
        <div className=" flex justify-between w-full">
          <div className=" items-start border-gray-200 border rounded mx-5 shadow-xl">
            <SidebarFilter categories={categories} suppliers={suppliers} />
          </div>
          <div className=" w-4/5">
            <Product name="Laptop Asus ROG Zephyrus Duo 15 GX551QR-HB120T" price="80000000" />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
