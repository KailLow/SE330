import { NewCustomer } from "@/api/customer/addNewCustomer.api";
import { Button, Label } from "flowbite-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ControllerTextInput from "../ControllerTextInput";
import ControllerTextarea from "../ControllerTextarea";
import { useCreateCustomerModal } from "./CreateCustomerFormModal";

export default function CreateCustomerFormUI({
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
    } = useForm<NewCustomer>();

    const { close } = useCreateCustomerModal();

    return (
        <div
            className={` w-full bg-background-normal rounded-2xl p-8 ${className}`}
            {...props}
        >
            <h1
                className={` text-secondary-950 text-2xl text-center font-semibold`}
            >
                Add Customer
            </h1>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <div className=" flex flex-col gap-5 mt-5">
                    <ControllerTextInput
                        control={control}
                        name="name"
                        title="Name"
                        rules={{ required: "Name is required" }}
                        register={register}
                        placeholder="Enter Customer name..."
                        onValueChange={(d: any) => {
                            clearErrors("name");
                        }}
                        error={errors.name}
                    />
                    <ControllerTextInput
                        control={control}
                        name="phone"
                        title="Phone"
                        rules={{ required: "Phone is required" }}
                        register={register}
                        placeholder="Enter Customer phone..."
                        onValueChange={(d: any) => {
                            clearErrors("phone");
                        }}
                        error={errors.phone}
                    />
                    <div>
                        <div className="mb-2 block">
                            <Label
                                className=" text-secondary-900 font-semibold"
                                htmlFor="address"
                                value="Address"
                            />
                        </div>
                        <ControllerTextarea
                            id="address"
                            rows={4}
                            placeholder="Leave your address here..."
                            control={control}
                            name="address"
                            title="Address"
                            rules={{ required: "Address is required" }}
                            register={register}
                            onValueChange={(d: any) => {
                                clearErrors("address");
                            }}
                            error={errors.address}
                        />
                    </div>
                </div>
                <div className=" flex justify-between mt-12">   
                    <Button className=" bg-red-400 hover:bg-red-500" onClick={() => close()}>
                        Back
                    </Button>
                    <Button className=" bg-green-400 hover:bg-green-500" type="submit">Create Customer</Button>
                </div>
            </form>
        </div>
    );
}

type PropTypes = React.ComponentPropsWithoutRef<"div"> & {
    onSubmitData: SubmitHandler<NewCustomer>;
};