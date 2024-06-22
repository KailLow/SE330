import BaseEntity from "./BaseEntity";

export default interface Supplier extends BaseEntity {
    [x: string]: any;
    name: string;
    phone: string;
    email: string;
    address: string;
}

export function createSupplier(
    name: string,
    phone: string,
    email: string,
    address: string,
    id: string
  ): Supplier {
    const supplier: Supplier = {
        name,
        phone,
        email,
        address,
        id
    };
    return supplier;
}