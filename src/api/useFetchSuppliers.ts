import { useState, useEffect } from "react";
import axios from "axios";
import API from "@/constants/apiEndPoint";
import Supplier, { createSupplier } from "@/types/entity/Supplier";

const useFetchSuppliers = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const fetchSuppliers = async () => {
        const tokenStr = localStorage.getItem("token") || "";
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${API.authentication.supplier}`,
            headers: {
                Authorization: "Bearer " + tokenStr,
            },
        };

        try {
            const res = await axios.request(config);
            const supplierData = res.data as Supplier[];
            const newSuppliers = supplierData.map((data) =>
                createSupplier(
                    data.name, 
                    data.phone,
                    data.email,
                    data.address,
                    data.id
                )
            );
            setSuppliers(newSuppliers);
            return newSuppliers;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    return { suppliers, fetchSuppliers };
};

export default useFetchSuppliers;