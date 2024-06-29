import axios from "axios";
import { useState, useEffect } from "react";
import API from "@/constants/apiEndPoint";
import Category, { createCategory } from "@/types/entity/Category";

const useFetchCategories = () => {
  const [category, setData] = useState<Category[]>([]);

  const loadCategories = async () => {
    const tokenStr = localStorage.getItem("token") || "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API.authentication.category}`,
      headers: {
        Authorization: "Bearer " + tokenStr,
      },
    };

    try {
      const res = await axios.request(config);
      const category = res.data as Category[];
      const newCategory = category.map((data) =>
        createCategory(data.name, data.id)
      );
      setData(newCategory);
      return category;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return { category, loadCategories };
};

export default useFetchCategories;