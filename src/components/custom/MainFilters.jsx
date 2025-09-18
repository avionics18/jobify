// icons
import { Search } from "lucide-react";
// components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MainFilters = ({ setSearchQuery }) => {
    const searchHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let searchQuery = formData.get("search-query");

        if (searchQuery) {
            setSearchQuery(searchQuery);
        }
    };

    return (
        <Card className="mb-6">
            <CardContent className="sm:mx-12">
                <form
                    onSubmit={searchHandler}
                    className="flex items-stretch gap-6"
                >
                    <Input
                        name="search-query"
                        type="text"
                        className="h-12 flex-1 px-4"
                        placeholder="Serach jobs by title..."
                    />
                    <Button type="submit" className="h-12 w-[180px]">
                        <Search /> Search
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default MainFilters;
