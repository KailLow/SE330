import BaseEntity from "./BaseEntity";

export default interface Category extends BaseEntity {
    [x: string]: any;
    name: string;
}

export function createCategory(
    name: string,
    id: string,
  ): Category {
    const category: Category = {
        name,
        id,
    };
    return category;
}
