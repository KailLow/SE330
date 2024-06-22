"use client";

import Buttons from "@/components/Buttons";
import { useSearchParams } from "next/navigation";
import { HiPlus } from "react-icons/hi";
// import { useQuery } from "react-query";
// import SEARCH_PARAMS from "@/constants/searchParams";
// import viewCategoryList from "@/api/category/viewCategoryList.api";
// import { useCreateCategoryModal } from "@/components/CreateCategoryForm/CreateCategoryFormModal";
// import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import DataTable from "@/components/Table/DataTable";
import Category, { createCategory } from "@/types/entity/Category";
import { Button } from "flowbite-react";
// import { useDeleteCategoryMutation } from "@/api/category/deleteCategory.api";
// import { useUpdateCategoryModal } from "@/components/UpdateCategoryForm/UpdateCategoryFormModal";

const data: Category[] = [
    createCategory('Laptop', '1'),
    createCategory('Clothing', '2'),
    createCategory('Books', '3'),
    createCategory('Home & Garden', '4'),
    createCategory('Sports & Outdoors', '5'),
  ];

export default function Page() {
    const searchParams = useSearchParams();

    // const categoryKeyword = searchParams.get(SEARCH_PARAMS.name) || "";

    // const { openCreateCategoryModal } = useCreateCategoryModal();
    // const { openUpdateCategoryModal } = useUpdateCategoryModal();
    // const { openClaimModal } = useClaimModal();

    // const { data, isLoading, refetch } = useQuery<Category[]>(
    //     ["categories", categoryKeyword],
    //     viewCategoryList,
    //     {
    //         retry: false,
    //     },
    // );

    // const deleteCategoryMutation = useDeleteCategoryMutation(refetch);

    return (
        <div className="grid grid-cols-4 gap-5">
            <div></div>
            <div className="col-span-2">
                {/* <CategorySearch className="w-full mb-8" /> */}
                <p className="text-yellow-500 text-sm font-semibold mb-4">
                    {data?.length} items
                </p>
                <DataTable
                    data={data || []}
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
                    onEdit={(category) => {
                        // openUpdateCategoryModal(category.id, refetch);
                    }}
                    pick={{
                        name: { title: "Name" },
                    }}
                />
            </div>

            <div className="flex justify-end items-start">
                <Button
                    size="md"
                    // onClick={() => openCreateCategoryModal(refetch)}
                >
                    <HiPlus className=" w-4 h-4 mr-2" />
                    New category
                </Button>
            </div>
        </div>
    );
}