import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const SalaryFilter = () => {
    const [value, setValue] = useState("");

    return (
        <div>
            <p className="mb-2 text-sm">Select Salary (per annum)</p>
            <Select
                value={value}
                onValueChange={(currVal) => setValue(currVal)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="No salary range selected" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Less than 6L</SelectItem>
                    <SelectItem value="2">Between 6 to 10L</SelectItem>
                    <SelectItem value="3">Between 10 to 15L</SelectItem>
                    <SelectItem value="4">Between 15 to 30L</SelectItem>
                    <SelectItem value="5">Greater than 30L</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SalaryFilter;
