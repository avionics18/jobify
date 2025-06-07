import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
// api
import { getAllCompanies, getAllJobs } from "@/api";
// hooks
import useFetch from "@/hooks/useFetch";
// components
import TopLoader from "@/components/custom/TopLoader";
import JobCard from "@/components/custom/JobCard";
import NoResultsFound from "@/components/custom/NoResultsFound";
import JobLoadingCards from "@/components/custom/JobLoadingCards";
import MainFilters from "@/components/custom/MainFilters";
import SidebarFilters from "@/components/custom/SidebarFilters";
import JobGrid from "@/components/custom/JobGrid";
import { Card, CardContent } from "@/components/ui/card";

const JobListing = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [companyID, setCompanyID] = useState("");
    const [salaryRange, setSalaryRange] = useState(null);
    const [jobType, setJobType] = useState("");
    const [workMode, setWorkMode] = useState("");

    const { isLoaded, user } = useUser();

    const {
        fn: fnCompanies,
        data: dataCompanies,
        loading: loadingCompanies,
        error: errorCompanies,
    } = useFetch(getAllCompanies);

    const {
        fn: fnJobs,
        data: dataJobs,
        loading: loadingJobs,
        error: errorJobs,
    } = useFetch(getAllJobs, { location, company_id: companyID, searchQuery });

    useEffect(() => {
        if (isLoaded) {
            fnCompanies();
        }
    }, [isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            fnJobs();
        }
    }, [isLoaded, location, companyID, searchQuery]);

    const displayJobs = () => {
        if (loadingJobs !== null && !errorJobs) {
            if (loadingJobs) {
                return (
                    <>
                        <TopLoader />
                        <JobLoadingCards />
                    </>
                );
            } else {
                if (dataJobs.length) {
                    return dataJobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isMyJob={job.recruiter_id === user.id}
                            savedInit={job.saved.length > 0}
                        />
                    ));
                } else {
                    return (
                        <div className="col-span-4">
                            <NoResultsFound />
                        </div>
                    );
                }
            }
        }
    };

    return (
        <section className="py-12">
            <h1 className="font-bold text-3xl xl:text-5xl tracking-tighter mb-10">
                Latest Jobs
            </h1>
            {/* Search Filter */}
            <MainFilters
                setSearchQuery={setSearchQuery}
                setLocation={setLocation}
            />
            <div className="job-mini-dash flex items-start gap-6">
                <div className="filters-sidebar w-[400px] sticky top-10">
                    {/* Sidebar Filters */}
                    <Card>
                        <CardContent>
                            <h3 className="font-bold text-xl mb-4">
                                Filters Jobs
                            </h3>
                            <SidebarFilters />
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
