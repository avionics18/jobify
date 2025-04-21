import { useEffect, useState } from "react";
// utils
import { cn } from "@/lib/utils";
// components
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import TopLoader from "@/components/custom/TopLoader";
import { Skeleton } from "@/components/ui/skeleton";
// icons
import { Check, ChevronsUpDown } from "lucide-react";

const CompanyComboBox = ({ loading, error, companies, setCompanyID }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [label, setLabel] = useState(null);

    if (loading !== null && !error) {
        if (loading) {
            return (
                <>
                    <TopLoader />
                    <Skeleton className="w-full h-9 rounded-sm" />
                </>
            );
        } else {
            return (
                <>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                            >
                                {value ? label : "Select Company..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[350px] p-0">
                            <Command>
                                <CommandInput placeholder="Search Company..." />
                                <CommandList>
                                    <CommandEmpty>
                                        No company found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {companies.map((company) => (
                                            <CommandItem
                                                key={company.value}
                                                value={company.value}
                                                onSelect={(currentLabel) => {
                                                    if (
                                                        currentLabel === label
                                                    ) {
                                                        setLabel(null);
                                                        setValue(null);
                                                        setCompanyID(null);
                                                    } else {
                                                        setLabel(currentLabel);
                                                        setValue(
                                                            companies.find(
                                                                (company) =>
                                                                    company.label ===
                                                                    currentLabel
                                                            ).value
                                                        );
                                                        setCompanyID(
                                                            companies.find(
                                                                (company) =>
                                                                    company.label ===
                                                                    currentLabel
                                                            ).value
                                                        );
                                                    }
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === company.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {company.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </>
            );
        }
    }
};

export default CompanyComboBox;
