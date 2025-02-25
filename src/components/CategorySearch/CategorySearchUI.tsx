import React, { useRef } from "react";
import {
    Button as ButtonFlowbite,
    TextInput as TextInputFlowbite,
    CustomFlowbiteTheme,
    Button,
} from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";
import SEARCH_PARAMS from "@/constants/searchParams";
import withQuery from "@/utils/withQuery";
import Category from "@/types/entity/Category";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategorySearchUI({
    onSearch = () => {},
    onCategorySearchChange = () => {},
    isCategoryLoading,
    className,
    ...props
}: PropTypes) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryNameRef = useRef<HTMLInputElement>(null);

    return (
        <div {...props} className={className}>
            <ButtonFlowbite.Group className="w-full">
                <TextInputFlowbite
                    ref={categoryNameRef}
                    theme={textInputTheme}
                    defaultValue={searchParams.get(SEARCH_PARAMS.name) || ""}
                    placeholder="Enter category name here..."
                    sizing="md"
                />
                <Button
                    size="md"
                    className=" bg-secondary rounded-l-none"
                    pill
                    onClick={() => {
                        router.push(
                            withQuery("/admin/category", {
                                [SEARCH_PARAMS.name]:
                                    categoryNameRef.current?.value,
                            }),
                        );
                    }}
                >
                    <HiOutlineSearch className="h-4 w-4" />
                </Button>
            </ButtonFlowbite.Group>
        </div>
    );
}

const textInputTheme: CustomFlowbiteTheme["textInput"] = {
    base: "w-full",
    field: {
        input: {
            withAddon: {
                off: "rounded-none rounded-s-lg w-full",
            },
        },
    },
};

type PropTypes = React.ComponentPropsWithRef<"div"> & {
    onCategorySearchChange?: (keyword: string) => any;
    onSearch?: () => any;
    isCategoryLoading?: boolean;
    categories?: Category[];
    className?: string;
};