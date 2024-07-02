import apiInstance from "../apiInstance";
import { useMutation } from "react-query";
import useLoading from "@/hooks/useLoading";
import Staff from "@/types/entity/Staff";

export default async function deleteStaffAPI(staff?: Staff) {
    if (!staff?.id) throw new Error("Invalid staff");

    const response = await apiInstance.delete(`/staff/${staff.id}`);

    return response.data;
}

export function useDeleteStaffMutation(refetch: () => any) {
    const { openLoading, closeLoading } = useLoading();

    const deleteMutation = useMutation(deleteStaffAPI, {
        onMutate: () => {
            openLoading("Deleting staff...");
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