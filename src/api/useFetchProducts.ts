import axios from "axios";
import { useState, useEffect } from "react";
import API from "@/constants/apiEndPoint";
import Product, { createProduct } from "@/types/entity/Product";

const useFetchCategories = () => {
    const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const tokenStr = localStorage.getItem("token") || "";
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API.authentication.product}`,
        headers: {
            Authorization: "Bearer " + tokenStr,
        },
    };

    try {
        const res = await axios.request(config);
        console.log(res);

        if (res.status == 401)
            console.log("aaaaaa");
        const product = res.data as Product[];
        const newProduct = product.map((data) =>
            createProduct(
                data.name,
                data.unit,
                data.price,
                data.quantity,
                data.warrantyPeriod,
                data.isAvailable,
                data.photoURL,
                data.category,
                data.id
            )
        );

        setProducts(newProduct);
        console.log(product);
        return product;
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
}, [])

  return { products, fetchProducts };
};

export default useFetchCategories;