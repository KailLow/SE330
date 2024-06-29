import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Category from "../../types/entity/Category";
import ControllerSelectInput from "../ControllerSelectInput";
import ControllerTextInput from "../ControllerTextInput";
import DropZone from "../DropZone";
import { useUpdateProductModal } from "./UpdateProductFormModal";
import Product from "@/types/entity/Product";
import { UpdatedProduct } from "@/api/product/updateProduct.api";
import { Button } from "flowbite-react";

export default function UpdateProductFormUI({
    categories = [],
    isCategoryLoading = false,
    product,
    onSubmitData,
    className,
    ...props
}: PropTypes) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setValue,
        clearErrors,
    } = useForm<UpdatedProduct>({ defaultValues: product });

    const { closeUpdateProductModal } = useUpdateProductModal();

    return (
        <div
            className={` w-1/2 rounded-2xl bg-zinc-400 p-8 ${className}`}
            {...props}
        >
            <h1
                className={` text-secondary-950 text-2xl text-center font-semibold`}
            >
                Update product
            </h1>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <div className=" grid grid-cols-1 gap-5">
                    <div>
                        <ControllerTextInput
                            control={control}
                            name="name"
                            title="Name"
                            rules={{ required: "Name is required" }}
                            register={register}
                            placeholder="BOYALINK"
                            onValueChange={(d: any) => {
                                clearErrors("name");
                            }}
                            error={errors.name}
                        />
                        <ControllerSelectInput
                            control={control}
                            name="categoryId"
                            title="Category"
                            defaultValue={product?.category}
                            isLoading={isCategoryLoading}
                            items={categories}
                            choseValue={getValues("categoryId")}
                            onValueChange={(value : any) =>
                                setValue("categoryId", value)
                            }
                        />
                        <div className=" flex gap-5">
                            <ControllerTextInput
                                control={control}
                                className=" w-full"
                                name="price"
                                title="Price"
                                type="number"
                                rules={{
                                    required: "Price is required",
                                    validate: (value: any) =>
                                        value <= 0
                                            ? "Price must be greater than 0"
                                            : undefined,
                                }}
                                register={register}
                                onValueChange={(d: number) => {
                                    clearErrors("price");
                                }}
                                error={errors.price}
                            />
                            <ControllerTextInput
                                control={control}
                                className="min-w-36"
                                name="unit"
                                title="Unit"
                                rules={{ required: "Unit is required" }}
                                register={register}
                                placeholder="Unit"
                                onValueChange={(d: any) => {
                                    clearErrors("unit");
                                }}
                                error={errors.unit}
                            />
                        </div>
                        <div className=" flex items-end gap-2">
                            <ControllerTextInput
                                control={control}
                                className="w-full"
                                name="warrantyPeriod"
                                type="number"
                                title="Warranty period"
                                rules={{
                                    required: "Warranty period is required",
                                    validate: (value: any) =>
                                        value < 0
                                            ? "Warranty period must be greater than 0"
                                            : undefined,
                                }}
                                register={register}
                                placeholder="Warranty period"
                                onValueChange={(d: any) => {
                                    clearErrors("warrantyPeriod");
                                }}
                                error={errors.warrantyPeriod}
                            />
                            <p className=" font-medium mb-5"> months</p>
                        </div>
                    </div>
                    {/* <div className=" pt-10">
                        <DropZone
                            file={getValues("photo")}
                            defaultValue={product?.photoURL}
                            onFileChange={(file : any) => setValue("photo", file)}
                        />
                    </div> */}
                </div>
                <div className=" flex justify-between mt-12">
                    <Button
                        className=" bg-red-400 hover:bg-red-500"
                        onClick={() => closeUpdateProductModal()}
                    >
                        Cancel
                    </Button>
                    <Button className=" bg-green-400 hover:bg-green-500" type="submit">Update</Button>
                </div>
            </form>
        </div>
    );
}

type PropTypes = React.ComponentPropsWithoutRef<"div"> & {
    categories?: Category[];
    isCategoryLoading?: boolean;
    onSubmitData: SubmitHandler<UpdatedProduct>;
    product?: Product;
    isLoading: boolean;
};