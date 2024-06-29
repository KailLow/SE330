import ProductPreview from "@/types/entity/ProductPreview";
import apiInstance from "../apiInstance";
import { useMutation } from "react-query";
import useLoading from "@/hooks/useLoading";
import toast from "react-hot-toast";

export default async function deleteProductAPI(product?: ProductPreview) {
    if (!product?.id) throw new Error("Invalid product");

    const response = await apiInstance.delete(`/product/${product.id}`);

    return response.data;
}

export function useDeleteProductMutation(refetch: () => any) {
    const { openLoading, closeLoading } = useLoading();

    const deleteMutation = useMutation(deleteProductAPI, {
        onMutate: () => {
            openLoading("Deleting product...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (res, data) => {
            refetch();
            closeLoading();
        },
        onError: (error: any, data) => {
            closeLoading();
        },
    });

    return deleteMutation;
}