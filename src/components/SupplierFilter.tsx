"use client"

import useFetchSuppliers from '@/api/useFetchSuppliers';
import React, { ChangeEvent, useState } from 'react'

export default function SupplierFilter() {
    const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
    
    
    const { suppliers, fetchSuppliers } = useFetchSuppliers();
    return (
        <>
            <div className="mb-6">
                <h3 className="text-md font-bold mb-2">Suppliers</h3>
                {suppliers.map((supplier: any) => (
                    <div key={supplier.id} className="flex items-center mb-2">
                        <input
                            type="radio"
                            id={`supplier-${supplier.id}`}
                            name="supplier"
                            value={supplier.id}
                            checked={selectedSupplier === supplier.id}
                            // onChange={handleSupplierChange}
                            className="mr-2"
                        />
                        <label htmlFor={`supplier-${supplier.id}`} className="text-gray-700">
                            {supplier.name}
                        </label>
                    </div>
                ))}
            </div>
        </>
    )
}
