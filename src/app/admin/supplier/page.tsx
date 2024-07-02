"use client";

import { useSearchParams } from "next/navigation";
import { HiPlus } from "react-icons/hi";
import DataTable from "@/components/Table/DataTable";
import { Button } from "flowbite-react";
import SupplierSearch from "@/components/Supplier/SupplierSearch";
import useFetchSuppliers from "@/api/useFetchSuppliers";

export default function Page() {
    const searchParams = useSearchParams();
    const { suppliers, fetchSuppliers } = useFetchSuppliers();

    return (
        <div className="grid grid-cols-5 gap-5">
            <div className=" col-span-4">
                <p className=" font-semibold text-2xl mb-4">Supplier</p>
                <SupplierSearch className="w-full mb-8" />
                <p className="text-yellow-500 text-sm font-semibold mb-4">
                    {suppliers?.length} items
                </p>
                <DataTable
                    data={suppliers || []}
                    // onDelete={(category) => {
                    //     openClaimModal(
                    //         <>
                    //             Do you want to delete category{" "}
                    //             <span>{category.name}</span>
                    //         </>,
                    //         (confirm) =>
                    //             confirm &&
                    //             deleteCategoryMutation.mutate(category),
                    //     );
                    // }}
                    onEdit={(supplier) => {
                        // openUpdateCategoryModal(category.id, refetch);
                    }}
                    pick={{
                        name: { title: "Name" },
                        phone: { title: "Phone" },
                        email: { title: "Email" },
                        address: { title: "Address" }
                    }}
                />
            </div>

            <div className="flex justify-end items-start">
                <Button
                    size="md"
                    className=" bg-secondary"
                    // onClick={() => openCreateCategoryModal(refetch)}
                >
                    <HiPlus className=" w-4 h-4 mr-2" />
                    New Supplier
                </Button>
            </div>
        </div>
    );
}