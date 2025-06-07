import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const JobTypeFilter = () => {
    return (
        <div>
            <p className="mb-2 text-sm">Select Job Type</p>
            <RadioGroup defaultValue="default_jobType">
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
