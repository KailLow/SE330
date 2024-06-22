import Image from "next/image";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";
import Header from "@/components/Header";
import Product from "@/components/Product";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#eff1f2]">
      <Header />
      <div className="z-10 w-full max-w-5xl items-center justify-between lg:flex mt-20">
        <div>
          {/* <Carousel /> */}
          <Image
            src="/images/banner.png"
            alt="..."
            width={800}
            height={800} />
            <Product name="Laptop Asus ROG Zephyrus Duo 15 GX551QR-HB120T" price="80000000"/>
        </div>
      </div>
      <Footer />
    </main>
  );
}
