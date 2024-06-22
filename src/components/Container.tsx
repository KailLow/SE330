import React from "react";

interface ContainerProps{
    className? : string,
    children: React.ReactNode;
}

const Container = ({className, children}:ContainerProps) => {
    return(
        <div className="mx-auto max-w-7xl">
            {children}
        </div>
    )
}

export default Container;