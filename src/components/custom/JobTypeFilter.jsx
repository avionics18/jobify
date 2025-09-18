import { cn } from "@/lib/utils";
// components
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const JobTypeFilter = ({
    labelText = "",
    labelTextClassName = "",
    radioAlignHorizontal = false,
}) => {
    return (
        <div>
            <p className={cn("text-sm mb-3", labelTextClassName)}>
                {labelText}
            </p>
            <RadioGroup
                className={cn(
                    radioAlignHorizontal && "grid-flow-col justify-start"
                )}
                defaultValue="default_jobType"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="default_jobType"
                        id="default_jobType"
                    />
                    <Label htmlFor="default_jobType">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fulltime" id="fulltime" />
                    <Label htmlFor="fulltime">Full-Time</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="contract" id="contract" />
                    <Label htmlFor="contract">Contract</Label>
                </div>
            </RadioGroup>
        </div>
    );
};

export default JobTypeFilter;
