import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const JobLoadingCards = ({ n: numOfCards = 4, className }) => {
    return [...Array(numOfCards).keys()].map((e) => (
        <Skeleton key={e} className={cn("h-56 border", className)} />
    ));
};

export default JobLoadingCards;
