// icons
import { Search } from "lucide-react";
// components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LocationComboBox from "@/components/custom/LocationComboBox";

const MainFilters = ({ setSearchQuery, setLocation }) => {
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
            <CardContent>
                <form
                    onSubmit={searchHandler}
                    className="flex items-center gap-6"
                >
                    <Input
                        name="search-query"
                        type="text"
                        className="flex-1 px-4"
                        placeholder="Serach jobs by title..."
                    />
                    <LocationComboBox setLocation={setLocation} />
                    <Button type="submit" className="w-[150px]">
                        <Search /> Search
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default MainFilters;
