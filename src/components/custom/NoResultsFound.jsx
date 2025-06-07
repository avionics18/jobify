import { Card, CardContent } from "@/components/ui/card";

const NoResultsFound = ({ text = "Oops! No result found." }) => {
    return (
        <Card className="pb-14">
            <CardContent>
                <p className="flex flex-col items-center justify-center gap-5">
                    <img
                        className="w-40"
                        src="assets/empty_state.svg"
                        alt="Empty State"
                    />
                    <span className="text-3xl text-gray-500 font-light">
                        {text}
                    </span>
                </p>
            </CardContent>
        </Card>
    );
};

export default NoResultsFound;
