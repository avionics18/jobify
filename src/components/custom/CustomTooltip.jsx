import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";

const CustomTooltip = ({
    triggerContent,
    tooltipContent,
    className = "bg-zinc-700",
    arrowClassName = "bg-zinc-700 fill-zinc-700",
}) => {
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>{triggerContent}</TooltipTrigger>
                    <TooltipContent
                        className={className}
                        arrowClassName={arrowClassName}
                    >
                        {tooltipContent}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
};

export default CustomTooltip;
