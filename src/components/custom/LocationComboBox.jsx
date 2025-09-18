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

const LocationComboBox = ({
    locations,
    setLocation,
    placeholderText = "Select Location",
    labelText = "",
    popoverWidthClass = "w-[350px]",
}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [label, setLabel] = useState(null);

    return (
        <div>
            {labelText && (
                <p className="text-primary text-sm mb-2">{labelText}</p>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value ? label : placeholderText}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={`${popoverWidthClass} p-0`}>
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
        </div>
    );
};

export default LocationComboBox;
