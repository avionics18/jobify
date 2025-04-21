import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
// api
import { getAllJobs } from "@/api";
// components
import TopLoader from "@/components/custom/TopLoader";
import JobCard from "@/components/custom/JobCard";
import NoResultsFound from "@/components/custom/NoResultsFound";
import JobLoadingCards from "@/components/custom/JobLoadingCards";

const JobListing = () => {
    const [location, setLocation] = useState("");
    const [company_id, setCompany_id] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { isLoaded, user } = useUser();

    const {
        fn: fnJobs,
        data: dataJobs,
        loading: loadingJobs,
        error: errorJobs,
    } = useFetch(getAllJobs, { location, company_id, searchQuery });

    useEffect(() => {
        if (isLoaded) {
            fnJobs();
        }
    }, [isLoaded, location, company_id, searchQuery]);

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
            {/* Add Search Filter Here */}
            <div className="job-mini-dash flex items-start gap-4">
                <div className="filters-sidebar w-[400px] sticky top-10">
                    {/* Add Filters Here */}
                    <div className="bg-zinc-800 border rounded p-6 shadow shadow-slate-800">
                        <p className="font-light text-lg">Apply Filters</p>
                    </div>
                    {/* Add Filters Here */}
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                    {displayJobs()}
                </div>
            </div>
        </section>
    );
};

export default JobListing;
