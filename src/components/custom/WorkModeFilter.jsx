import { cn } from "@/lib/utils";
// components
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const WorkModeFilter = ({
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
                defaultValue="default_workMode"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="default_workMode"
                        id="default_workMode"
                    />
                    <Label htmlFor="default_workMode">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="onsite" id="onsite" />
                    <Label htmlFor="onsite">On-Site</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="remote" id="remote" />
                    <Label htmlFor="remote">Remote</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hybrid" id="hybrid" />
                    <Label htmlFor="hybrid">Hybrid</Label>
                </div>
            </RadioGroup>
        </div>
    );
};

export default WorkModeFilter;
