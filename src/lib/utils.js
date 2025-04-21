import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// shadcn conditional tailwind classes
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// salary formatter
export const salaryFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "long",
});
