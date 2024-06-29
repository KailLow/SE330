import { SubmitHandler, useForm } from "react-hook-form";
import { UpdatedCategory } from "@/api/category/updateCategory.api";
import Category from "@/types/entity/Category";
import { useUpdateCategoryModal } from "./UpdateCategoryFormModal";
import ControllerTextInput from "../ControllerTextInput";
import { Button } from "flowbite-react";

export default function UpdateCategoryFormUI({
    onSubmitData,
    category,
    className,
    ...props
}: PropTypes) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        clearErrors,
    } = useForm<UpdatedCategory>({ defaultValues: category });

    const { closeUpdateCategoryModal } = useUpdateCategoryModal();

    return (
        <div
            className={` w-full bg-zinc-400 rounded-2xl p-8 ${className}`}
            {...props}
        >
            <h1
                className={` text-secondary-950 text-2xl text-center font-semibold`}
            >
                Update category
            </h1>
            <form onSubmit={handleSubmit(onSubmitData)}>
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
                </div>

                <div className=" flex justify-between mt-12">
                    <Button
                        className=" bg-red-400 hover:bg-red-500"
                        onClick={() => closeUpdateCategoryModal()}
                    >
                        Cancel
                    </Button>
                    <Button className=" bg-green-400 hover:bg-green-500"  type="submit">Update</Button>
                </div>
            </form>
        </div>
    );
}

type PropTypes = React.ComponentPropsWithoutRef<"div"> & {
    onSubmitData: SubmitHandler<UpdatedCategory>;
    category?: Category;
    isLoading: boolean;
};