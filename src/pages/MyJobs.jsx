import { useLocation } from "react-router-dom";
import { toast } from "sonner";
// components
import JobCard from "@/components/custom/JobCard";
// data
import jobs from "@/data/jobs.json";

const MyJobs = () => {
    const { state } = useLocation();

    if (state) {
        // If the user is coming from onboarding page
        toast.success(state.message, {
            description: state.description,
        });
    }

    return (
        <section className="py-12">
            <h1 className="font-bold text-3xl xl:text-5xl tracking-tighter mb-10">
                My Jobs
            </h1>

            <div className="grid grid-cols-3 gap-4">
                {jobs?.length &&
                    saved_jobs.map((job) => (
                        <JobCard key={job.id} job={job} savedInit={true} />
                    ))}
            </div>
        </section>
    );
};

export default MyJobs;
