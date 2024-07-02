"use client";

import viewCategoryList from '@/api/category/viewCategoryList.api';
import Category from '@/types/entity/Category';
import Supplier from '@/types/entity/Supplier';
import { useState, ChangeEvent } from 'react';
import { useQuery } from 'react-query';
import SupplierFilter from './SupplierFilter';

interface SidebarFilterProps {
    categories: Category[];
    suppliers: Supplier[];
    onFilterChange: (category: string | null, supplier: string | null) => void;
  }

export default function SidebarFilter({ onFilterChange }: any) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  
    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
      const categoryId = event.target.value;
      setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
      onFilterChange(categoryId === selectedCategory ? null : categoryId, selectedSupplier);
    };
  
    const handleSupplierChange = (event: ChangeEvent<HTMLInputElement>) => {
      const supplierId = event.target.value;
      setSelectedSupplier(supplierId === selectedSupplier ? null : supplierId);
      onFilterChange(selectedCategory, supplierId === selectedSupplier ? null : supplierId);
    };

    
    const { data, isLoading } = useQuery<Category[]>(
        ["category"],
        viewCategoryList,
    );
  
    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-6 h-full">
                <h2 className="text-lg font-bold mb-4">Filters</h2>

                <div className="mb-6">
                    <h3 className="text-md font-bold mb-2">Categories</h3>
                    {data?.map((category : any) => (
                        <div key={category.id} className="flex items-center mb-2">
                            <input
                                type="radio"
                                id={`category-${category.id}`}
                                name="category"
                                value={category.id}
                                checked={selectedCategory === category.id}
                                onChange={handleCategoryChange}
                                className="mr-2"
                            />
                            <label htmlFor={`category-${category.id}`} className="text-gray-700">
                                {category.name}
                            </label>
                        </div>
                    ))}
                </div>

                <SupplierFilter />        
            </div>
        </>
    )
}
