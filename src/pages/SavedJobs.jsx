// components
import JobCard from "@/components/custom/JobCard";
// data
import jobs from "@/data/jobs.json";

const SavedJobs = () => {
    const saved_jobs = jobs.filter((job) => job.saved.length);

    return (
        <section className="py-12">
            <h1 className="font-bold text-3xl xl:text-5xl tracking-tighter mb-10">
                Saved Jobs
            </h1>

            <div className="grid grid-cols-3 gap-4">
                {saved_jobs?.length &&
                    saved_jobs.map((job) => (
                        <JobCard key={job.id} job={job} savedInit={true} />
                    ))}
            </div>
        </section>
    );
};

export default SavedJobs;
