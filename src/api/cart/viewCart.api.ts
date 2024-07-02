import apiInstance from "../apiInstance";
import { CartProduct } from "@/types/entity/Cart";

export default async function viewCartList({
    queryKey,
}: {
    queryKey: any;
}) {
    const [_key, name] = queryKey;
    const response = await apiInstance.get("/cart", {
        // params: { name },
    });

    const suppliers = response.data as CartProduct[];

    console.log(suppliers);

    return suppliers;
}