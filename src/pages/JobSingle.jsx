import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
// components
import { Button } from "@/components/ui/button";
// icons
import {
    Briefcase,
    DoorClosed,
    DoorOpen,
    Edit,
    MapPin,
    Eye,
    ChevronDown,
} from "lucide-react";
// data
import jobs from "@/data/jobs.json";

// json data
const JobSingle = () => {
    const { isLoaded, user } = useUser();

    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        if (jobs && id) {
            setJob(jobs.find((job) => job.id == id));
        }
    }, [jobs, id]);

    const displayApplicants = () => {
        if (job.applications?.length) {
            return job.applications?.map((application) => (
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <span>{application.name}</span>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="secondary"
                            className="font-normal"
                        >
                            <Eye /> View
                        </Button>
                        <Button
                            size="sm"
                            variant="secondary"
                            className="font-normal capitalize"
                        >
                            {application.status}
                            <ChevronDown />
                        </Button>
                    </div>
                </div>
            ));
        } else {
            return (
                <p className="text-center text-sm">No Applications found.</p>
            );
        }
    };

    if (job) {
        return (
            <section className="flex items-start gap-4 py-12">
                {isLoaded && job.recruiter_id === user.id && (
                    <div className="applicants w-[400px] border border-slate-800">
                        <h3 className="text-xl font-bold bg-slate-900 p-6">
                            Applicants
                        </h3>
                        <div className="p-6">{displayApplicants()}</div>
                    </div>
                )}
                <div className="job flex-1">
                    <div className="flex items-center gap-6 bg-slate-900 p-6">
                        <img
                            className="w-20 rounded-xl shadow"
                            src={job.company.logo_url}
                            alt={job.company.name}
                        />
                        <h1 className="font-bold text-3xl xl:text-5xl tracking-tighter">
                            {job.title}
                        </h1>
                        {isLoaded && job.recruiter_id === user.id && (
                            <Button className="ms-auto">
                                <Edit /> Change Job Details
                            </Button>
                        )}
                    </div>
                    <div className="flex items-center justify-between bg-slate-950 border border-slate-800 py-4 px-6">
                        <Button variant="outline">
                            <MapPin /> {job.location}
                        </Button>
                        <Button variant="outline">
                            <Briefcase /> {job.applications?.length} Applicants
                        </Button>
                        <Button variant="outline">
                            {job.isOpen ? <DoorOpen /> : <DoorClosed />}{" "}
                            {job.isOpen ? "Open" : "Closed"}
                        </Button>
                    </div>
                    {/* if recruiter -> change status of job */}
                    {/* if candidate -> view status of job */}
                    <p className="text-xl font-bold my-6">Job Description:</p>
                    <p className="text-lg">{job.description}</p>
                    <h3 className="text-xl font-bold my-6">
                        What we're looking for?
                    </h3>
                    <MDEditor.Markdown
                        source={job.requirements}
                        className="sm:text-lg p-8 mb-6"
                    />
                    {isLoaded && job.recruiter_id === user.id ? (
                        ""
                    ) : (
                        <Button className="w-full" size="lg">
                            Apply Job
                        </Button>
                    )}
                </div>
            </section>
        );
    } else {
        return false;
    }
};

export default JobSingle;
