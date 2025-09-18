import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
// api
import { getAllJobs } from "@/api";
// hooks
import useFetch from "@/hooks/useFetch";
// components
import MainFilters from "@/components/custom/MainFilters";
import SidebarFilters from "@/components/custom/SidebarFilters";
import JobGrid from "@/components/custom/JobGrid";
import { Card, CardContent } from "@/components/ui/card";

const JobListing = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [city, setCity] = useState("");
    const [companyID, setCompanyID] = useState("");
    const [salaryRange, setSalaryRange] = useState(null);
    const [jobType, setJobType] = useState("");
    const [workMode, setWorkMode] = useState("");

    const { isLoaded } = useUser();

    const {
        fn: fnJobs,
        data: dataJobs,
        loading: loadingJobs,
        error: errorJobs,
    } = useFetch(getAllJobs, {
        location: city,
        company_id: companyID,
        searchQuery,
    });

    useEffect(() => {
        if (isLoaded) {
            fnJobs();
        }
    }, [isLoaded, city, companyID, searchQuery]);

    return (
        <section className="py-12">
            <h1 className="font-bold text-3xl xl:text-5xl tracking-tighter mb-10">
                Latest Jobs
            </h1>
            {/* Search Filter */}
            <MainFilters setSearchQuery={setSearchQuery} />
            <div className="job-mini-dash flex items-start gap-6">
                <div className="filters-sidebar w-[500px] sticky top-10">
                    {/* Sidebar Filters */}
                    <Card>
                        <CardContent>
                            <h3 className="font-bold text-xl mb-4">
                                Filters Jobs
                            </h3>
                            <SidebarFilters
                                setCity={setCity}
                                popoverWidthClass="w-[450px]"
                            />
                        </CardContent>
                    </Card>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                    {/* List of Jobs */}
                    <JobGrid
                        loadingJobs={loadingJobs}
                        errorJobs={errorJobs}
                        dataJobs={dataJobs}
                    />
                </div>
            </div>
        </section>
    );
};

export default JobListing;
