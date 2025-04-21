import { Button } from "../ui/button";
import CustomTooltip from "./CustomTooltip";

const test = () => {
    return (
        <CustomTooltip
            triggerContent={
                <Button variant="destructive">
                    <Trash2 className="size-5" />
                </Button>
            }
            tooltipContent={"Delete this job"}
        />
    );
};

export default test;
