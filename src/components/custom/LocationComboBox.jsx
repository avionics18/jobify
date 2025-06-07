import { useState } from "react";
import { State } from "country-state-city";
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
// icons
import { Check, ChevronsUpDown } from "lucide-react";

const LocationComboBox = ({ setLocation }) => {
    const locations = [
        {
            value: "1",
            label: "Bengaluru",
        },
        {
            value: "2",
            label: "Pune",
        },
        {
            value: "3",
            label: "Hyderabad",
        },
        {
            value: "4",
            label: "Delhi",
        },
    ];

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [label, setLabel] = useState(null);

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[350px] justify-between"
                    >
                        {value ? label : "Select Location..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] p-0">
                    <Command>
                        <CommandInput placeholder="Search Location..." />
                        <CommandList>
                            <CommandEmpty>No location found.</CommandEmpty>
                            <CommandGroup>
                                {locations.map((location) => (
                                    <CommandItem
                                        key={location.value}
                                        value={location.value}
                                        onSelect={(currentValue) => {
                                            if (currentValue === value) {
                                                setLabel(null);
                                                setValue(null);
                                                setLocation("");
                                            } else {
                                                setLabel(
                                                    locations.find(
                                                        (location) =>
                                                            location.value ===
                                                            currentValue
                                                    ).label
                                                );
                                                setValue(currentValue);
                                                setLocation(
                                                    locations.find(
                                                        (state) =>
                                                            state.value ===
                                                            currentValue
                                                    ).label
                                                );
                                            }
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === location.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        {location.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default LocationComboBox;
