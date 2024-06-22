import React from 'react'
import Image from 'next/image'

export default function Product({ imageUrl, name, price }: any) {
    return (
        <>
            <div className="bg-white shadow-md w-64 rounded-xl border-xl border-gray-600 overflow-hidden p-1">
                <div className="relative">
                    <Image
                        priority
                        src="/images/product1.jpg"
                        alt="..."
                        width={200}
                        height={200} />
                </div>
                <div className="p-1">
                    <p className=" text-lg font-medium text-gray-700 line-clamp-2">
                        {name}
                    </p>
                    <p className=" text-right text-red-600 font-bold text-xl">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
                    </p>
                </div>
            </div>
        </>
    )
}
