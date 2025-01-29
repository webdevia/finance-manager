import React from "react";
import { RouterProvider } from "./RouterProvider";
import { ThemeProvider } from "./ThemeProvider";

export const Providers: React.FC = () => {
    return (
        <ThemeProvider>
            <RouterProvider />
        </ThemeProvider>
    )
}