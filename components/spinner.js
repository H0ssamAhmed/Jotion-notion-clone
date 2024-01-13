import { Loader } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
import React from 'react'

const spinnerVariants = cva(
    "text-muted-foreground animate-spin",
    {
        variants: {
            size: {
                default: "h-4 w-4",
                sm: "h-2 w-2",
                lg: "h-6 w-6",
                xlg: "h-10 w-10",
                xxlg: "h-20 w-20",
                icon: "h-10 w-10"
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);
export const Spinner = ({ size }) => {
    return <Loader className={cn(spinnerVariants({ size }))} />;
};
