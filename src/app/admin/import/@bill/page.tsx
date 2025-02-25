"use client";

import viewProductList from "@/api/product/viewProductList.api";
import BillProductTable from "@/components/BillProductTable";
import ImportBill, {ImportProduct} from "@/types/entity/ImportBill";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { HiCheck } from "react-icons/hi";

import addNewImport from "@/api/import/addNewImport.api";
import {
    createFailToast,
    createSuccessToast,
} from "@/components/OperationStateToast";
import Link from "@/components/Link";
import { SupplierContext } from "@/contexts/SupplierContext";
import useLoading from "@/hooks/useLoading";
import ProductPreview from "@/types/entity/ProductPreview";
import FORMATTER from "@/utils/formatter";
import _ from "lodash";
import { useMutation } from "react-query";
import useScreen from "@/hooks/useScreen";
import BillProductList from "@/components/BillProductList";
import UploadFile from "@/components/UploadFile";
import { read, utils } from "xlsx";
import viewDetailProduct from "@/api/product/viewDetailProduct.api";
import SearchInput from "@/components/SearchInput";
import { Button } from "flowbite-react";

const Page = () => {
    const [billProducts, setBillProducts] = useState<
        Map<string, ProductPreview>
    >(new Map<string, ProductPreview>());

    const { supplier } = useContext(SupplierContext);

    const { openLoading, closeLoading } = useLoading();

    const addNewImportMutation = useMutation(addNewImport, {
        onMutate: () => {
            openLoading("Deleting product...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (res: ImportBill<ImportProduct>, data) => {
            closeLoading();
            const link = `${window.location.origin}/import_bill/${res.id}`;
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
                addNewImportMutation.mutate(data),
            );
        },
    });

    function getTotalInfo() {
        let quantity = 0;
        let price = 0;
        billProducts.forEach((product) => {
            quantity += product.quantity * 1;
            price += product.price * product.quantity;
        });

        return { quantity, price };
    }

    const {
        control: billControll,
        getValues,
        setValue,
    } = useForm<ImportBill<ImportProduct>>();

    function getRequest() {
        const importProducts = Array.from(billProducts.values()).map(
            (product) => ({
                ..._.pick(product, ["price", "quantity"]),
                productId: product.id,
            }),
        );

        return {
            paymentMethod: getValues("paymentMethod"),
            supplierId: supplier?.id,
            importProducts: [...importProducts],
        };
    }

    function onSubmit() {
        const request = getRequest();
        addNewImportMutation.mutate(request);
    }

    const screen = useScreen();
    const isMobile = !screen("md");

    return (
        <div className=" h-full col-span-2 flex flex-col gap-3 lg:overflow-y-auto pl-2">
            <div className=" w-full flex flex-row items-center justify-between">
                <p className=" w-full font-semibold text-color-heading text-2xl">
                    Product List
                </p>
                {/* <UploadFile
                    onFileChange={async (file) => {
                        const ab = await file?.arrayBuffer();
                        if (ab) {
                            const wb = read(ab);
                            const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
                            const data: UploadFileRow[] =
                                utils.sheet_to_json(ws); // generate objects

                            data.forEach(
                                async ({ price, product_id, quantity }) => {
                                    const product = await viewDetailProduct({
                                        queryKey: ["product", product_id],
                                    });
                                    billProducts.set(product_id, {
                                        ...product,
                                        price,
                                        quantity,
                                    } as ProductPreview);
                                    setBillProducts(
                                        new Map(billProducts.entries()),
                                    );
                                },
                            );
                        }
                    }}
                /> */}
            </div>
            <SearchInput
                title="Search for product to add to import bill"
                placeholder="Enter product name here..."
                queryInfo={{
                    queryKeys: ["products"],
                    queryFunc: viewProductList,
                }}
                onSelect={(product) => {
                    billProducts.set(product.id, {
                        ...product,
                        productId: product.id,
                    });
                    setBillProducts(new Map(billProducts.entries()));
                }}
                className=""
            />
            {isMobile ? (
                <BillProductList
                    data={billProducts}
                    onChange={(id, product) => {
                        billProducts.set(id, product);
                        setBillProducts(new Map(billProducts.entries()));
                    }}
                    onRemove={(id: string) => {
                        billProducts.delete(id);
                        setBillProducts(new Map(billProducts.entries()));
                    }}
                />
            ) : (
                <BillProductTable
                    className="mt-8 flex-1"
                    data={billProducts}
                    onChange={(id, product) => {
                        billProducts.set(id, product);
                        setBillProducts(new Map(billProducts.entries()));
                    }}
                    onRemove={(id: string) => {
                        billProducts.delete(id);
                        setBillProducts(new Map(billProducts.entries()));
                    }}
                    fields={{
                        name: {
                            title: "Product name",
                            size: 3,
                            editable: false,
                        },
                        price: { title: "Price", size: 2, type: "number" },
                        quantity: {
                            title: "Quantity",
                            defaultValue: 1,
                            type: "number",
                            size: 2,
                            validateFunc: (value: number) => {
                                if (value <= 0)
                                    return "You must import at least 1 product";
                                return "";
                            },
                        },
                        totalPrice: {
                            title: "Total price",
                            size: 2,
                            calculateFunc: ({ price, quantity }) =>
                                FORMATTER.toCurrency(price * quantity),
                        },
                    }}
                />
            )}
            <div className=" mt-4 flex-none flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-0 w-full">
                <div className="flex-1 flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                        <p className=" text-secondary-950">
                            Total items:{"  "}
                            <span className=" text-lg font-semibold text-secondary-950">
                                {getTotalInfo().quantity}
                            </span>
                        </p>
                        <p className=" text-secondary-950">
                            Total price:{"  "}
                            <span className=" text-lg font-semibold text-primary-500">
                                {FORMATTER.toCurrency(getTotalInfo().price)}
                            </span>
                        </p>
                    </div>
                </div>
                <div className=" flex gap-5 justify-end sm:justify-normal">
                    <Button className=" bg-red-400 hover:bg-red-500" >Cancel</Button>
                    <Button className=" flex bg-green-400 hover:bg-green-500" onClick={() => onSubmit()}>
                        <HiCheck size={20} />
                        <p className=" ml-1">Submit</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

type UploadFileRow = {
    price: number;
    product_id: string;
    quantity: number;
};

const PAYMENT_METHOD = [
    { name: "Cash", id: "Cash" },
    { name: "Momo", id: "Momo" },
    { name: "Paypal", id: "Paypal" },
    { name: "Visa", id: "Visa" },
];

export default Page;