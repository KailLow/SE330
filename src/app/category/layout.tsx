import SEARCH_PARAMS from "@/constants/searchParams";
import { ModalProvider } from "@/contexts/ModalContext";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import withQuery from "@/utils/withQuery";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: ReactNodeChildren) {
    const myHeaders = new Headers();
    const accessToken = cookies().get("accessToken")?.value || "";
    myHeaders.append("Authorization", `Bearer ${accessToken}`);



    return (
        <div className=" w-screen h-screen flex">
            <div className=" w-max z-50">
            </div>
            <div className=" pt-8 px-5 pr-8 w-full">
                <ModalProvider>{children}</ModalProvider>
            </div>
        </div>
    );
}