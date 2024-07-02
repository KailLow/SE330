"use client";

import { useContext, useState } from "react";
import { HiCheck } from "react-icons/hi";

import addNewWarrantyBill from "@/api/warranty/addNewWarrantyBill.api";
import {
    createFailToast,
    createSuccessToast,
} from "@/components/OperationStateToast";
import Link from "@/components/Link";
import useLoading from "@/hooks/useLoading";
import WarrantyBill, { WarrantyProduct } from "@/types/entity/WarrantyBill";
import _ from "lodash";
import { useMutation, useQuery } from "react-query";
import Product from "@/types/entity/Product";
import viewDetailProduct from "@/api/product/viewDetailProduct.api";
import { Button, Textarea } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import viewDetailCustomer from "@/api/customer/viewDetailCustomer";
import Customer from "@/types/entity/Customer";

const Page = () => {
    const searchParams = useSearchParams();

    const id = searchParams.get("productId");
    const customerId = searchParams.get("customerId");

    const [billProducts, setBillProducts] = useState<
        Map<string, WarrantyProduct>
    >(new Map<string, WarrantyProduct>());

    const { openLoading, closeLoading } = useLoading();

    const [reason, setReason] = useState<string>("");
    const [note, setNote] = useState<string>("");

    const {
        data: product,
        isLoading: isProductLoading,
        refetch,
    } = useQuery<Product>(["product", id], viewDetailProduct, {
        refetchOnMount: "always",
        cacheTime: 0,
    });

    const { data: customer } = useQuery<Customer>(
        ["customer", customerId],
        viewDetailCustomer,
        {
            refetchOnMount: "always",
            cacheTime: 0,
        },
    );

    const addNewWarrantyBillMutation = useMutation(addNewWarrantyBill, {
        onMutate: () => {
            openLoading("Adding new warranty bill...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (res: WarrantyBill<WarrantyProduct>, data) => {
            closeLoading();
            const link = `${window.location.origin}/warranty-invoice/${res.id}`;
            createSuccessToast(
                "Successfully",
                <>
                    You can view your bill here <Link href={link}>{link}</Link>
                </>,
            );
        },
        onError: (error: any, data) => {
            closeLoading();
            createFailToast("Fail to create bill", error.message, () =>
                addNewWarrantyBillMutation.mutate(data),
            );
        },
    });

    async function onSubmit() {
        // const request = await getRequest();
        if (customerId && id) {
            addNewWarrantyBillMutation.mutate({
                customerId: customerId,
                warrantyProducts: [
                    {
                        productId: id,
                        quantity: 1,
                        note,
                        warrantyContent: reason,
                        id: id,
                    },
                ],
            });
        }
    }

    return (
        <div className=" h-full col-span-2 flex flex-col pl-2">
            <p className=" font-semibold text-color-heading text-lg">
                Product information
            </p>

            <p className=" mt-4 text-secondary-600">Product name</p>
            <p className=" mt-1 font-bold text-lg">{product?.name}</p>

            <p className=" mt-4 text-secondary-950 font-medium">Reason</p>
            <Textarea
                className={` mt-2 w-2/3 font-normal`}
                value={reason}
                rows={Math.max(4, reason.split("\n").length || 3)}
                onChange={(e) => setReason(e.target.value)}
            />

            <p className=" mt-4 text-secondary-950 font-medium">Note</p>
            <Textarea
                className={` mt-2 w-2/3 font-normal`}
                value={note}
                rows={Math.max(2, note.split("\n").length || 3)}
                onChange={(e) => setNote(e.target.value)}
            />
            <div className=" mt-4 flex-none flex items-end w-full">
                
                <div className=" flex gap-5">
                    <Button className=" bg-red-400 hover:bg-red-500">Cancel</Button>
                    <Button className=" bg-green-400 hover:bg-green-500 flex" onClick={() => onSubmit()}>
                        <HiCheck size={20} />
                        <p className=" ml-1">Submit</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Page;