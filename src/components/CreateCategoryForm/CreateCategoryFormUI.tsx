import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewCategory } from "@/api/category/addNewCategory.api";
import { Button } from "flowbite-react";
import ControllerTextInput from "../ControllerTextInput";
import { useCreateCategoryModal } from "./CreateCategoryModal";

export default function CreateCategoryFormUI({
    onSubmitData,
    className,
    ...props
}: PropTypes) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        clearErrors,
    } = useForm<NewCategory>();

    const { closeCreateCategoryModal } = useCreateCategoryModal();

    return (
        <div
            className={`w-full bg-zinc-400 rounded-2xl p-8 ${className}`}
            {...props}
        >
            <h1
                className={` text-2xl text-center font-semibold`}
            >
                Add category
            </h1>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <ControllerTextInput
                    control={control}
                    name="name"
                    title="Name"
                    rules={{ required: "Name is required" }}
                    register={register}
                    placeholder="CATEGORY..."
                    onValueChange={(d: any) => {
                        clearErrors("name");
                    }}
                    error={errors.name}
                />

                <div className="flex justify-between mt-8">
                    <Button
                        className=" bg-red-400 hover:bg-red-500"
                        onClick={() => closeCreateCategoryModal()}
                    >
                        Cancel
                    </Button>
                    <Button className=" bg-green-400 hover:bg-green-500" type="submit">Create</Button>
                </div>
            </form>
        </div>
    );
}

type PropTypes = React.ComponentPropsWithoutRef<"div"> & {
    onSubmitData: SubmitHandler<NewCategory>;
};