import { useUser } from "@clerk/clerk-react";

// components
import JobCard from "@/components/custom/JobCard";
import JobLoadingCards from "@/components/custom/JobLoadingCards";
import NoResultsFound from "@/components/custom/NoResultsFound";
import TopLoader from "@/components/custom/TopLoader";

const JobGrid = ({ loadingJobs, errorJobs, dataJobs }) => {
    const { user } = useUser();

    if (loadingJobs !== null && !errorJobs) {
        if (loadingJobs) {
            return (
                <>
                    <TopLoader />
                    <JobLoadingCards />
                </>
            );
        } else {
            if (dataJobs?.length) {
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
export default JobGrid;
