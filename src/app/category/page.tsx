"use client";

import { useSearchParams } from "next/navigation";
import { HiPlus } from "react-icons/hi";
import { useQuery } from "react-query";
import Category from "@/types/entity/Category";
import SEARCH_PARAMS from "@/constants/searchParams";
import viewCategoryList from "@/api/category/viewCategoryList.api";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import CategorySearch from "@/components/CategorySearch/CategorySearch";
import { useDeleteCategoryMutation } from "@/api/category/deleteCategory.api";
import { Button } from "flowbite-react";
import DataTable from "@/components/Table/DataTable";
import { useCreateCategoryModal } from "@/components/CreateCategoryForm/CreateCategoryModal";
import { useUpdateCategoryModal } from "@/components/UpdateCategoryForm/UpdateCategoryFormModal";

export default function Page() {
    const searchParams = useSearchParams();

    const categoryKeyword = searchParams.get(SEARCH_PARAMS.name) || "";

    const { openCreateCategoryModal } = useCreateCategoryModal();
    const { openUpdateCategoryModal } = useUpdateCategoryModal();
    const { openClaimModal } = useClaimModal();

    const { data, isLoading, refetch } = useQuery<Category[]>(
        ["categories", categoryKeyword],
        viewCategoryList,
        {
            retry: false,
        },
    );

    const deleteCategoryMutation = useDeleteCategoryMutation(refetch);

    return (
        <div className="grid grid-cols-4 gap-5">
            <div></div>
            <div className="col-span-2">
                <CategorySearch className="w-full mb-8" />
                <p className="text-yellow-500 text-sm font-semibold mb-4">
                    {data?.length} items
                </p>
                    <DataTable
                        data={data || []}
                        onDelete={(category: any) => {
                            openClaimModal(
                                <>
                                    Do you want to delete category{" "}
                                    <span>{category.name}</span>
                                </>,
                                (confirm: any) =>
                                    confirm &&
                                    deleteCategoryMutation.mutate(category),
                            );
                        }}
                        onEdit={(category: any) => {
                            openUpdateCategoryModal(category.id, refetch);
                        }}
                        pick={{
                            name: { title: "Name" },
                        }}
                    />
            </div>

            <div className="flex justify-end items-start">
                <Button
                    size="md"
                    onClick={() => openCreateCategoryModal(refetch)}
                >
                    <HiPlus className=" w-4 h-4 mr-2" />
                    New category
                </Button>
            </div>
        </div>
    );
}