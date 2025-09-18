import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
// api
import { toggleSavedJob } from "@/api";
// custom-hooks
import useFetch from "@/hooks/useFetch";
// utils
import { salaryFormatter } from "@/lib/utils";
// components
import TopLoader from "@/components/custom/TopLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CustomTooltip from "@/components/custom/CustomTooltip";
// icons
import {
    BookmarkCheck,
    BookmarkPlus,
    Building,
    Eye,
    MapPin,
    Trash2,
} from "lucide-react";

const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () => {}, // will be useful in "/saved_jobs" page
}) => {
    const [saved, setSaved] = useState(savedInit);

    const { isLoaded, user } = useUser();

    const {
        fn: fnToggleSavedJob,
        // initial value of savedJob = undefined, and when save btn is pressed
        // savedJob can have either value null or [{id, job_id, user_id, created_at}]
        data: savedJob,
        loading: loadingSavedJob,
        error: errorSavedJob,
    } = useFetch(toggleSavedJob, {
        isJobSavedAlready: saved,
    });

    useEffect(() => {
        if (savedJob !== undefined) {
            setSaved(savedJob?.length > 0);
        }
    }, [savedJob]);

    const saveJobHandler = async () => {
        if (isLoaded) {
            await fnToggleSavedJob({
                user_id: user.id,
                job_id: job.id,
            });
            // perform any actions after saving a job
            // like fetching the new set of jobs
            onJobSaved();
        }
    };

    const displaySaveJob = () => {
        if (saved) {
            return (
                <CustomTooltip
                    triggerContent={
                        <Button
                            variant="outline-success"
                            onClick={saveJobHandler}
                            disabled={loadingSavedJob}
                        >
                            <BookmarkCheck className="size-5" />
                        </Button>
                    }
                    tooltipContent={"Un-save this job"}
                />
            );
        } else {
            return (
                <CustomTooltip
                    triggerContent={
                        <Button
                            variant="outline"
                            onClick={saveJobHandler}
                            disabled={loadingSavedJob}
                        >
                            <BookmarkPlus className="size-5" />
                        </Button>
                    }
                    tooltipContent={"Save this job"}
                />
            );
        }
    };

    return (
        <Card className="shadow-sm shadow-slate-800">
            <CardHeader className="flex items-center gap-4">
                <img
                    className="w-16 rounded shadow"
                    src={job.company.logo_url}
                    alt={job.company.name}
                />
                <div>
                    <CardTitle className="text-xl mb-3">{job.title}</CardTitle>
                    <p className="text-sm flex items-center gap-2">
                        <span className="flex items-center gap-1">
                            <Building size={14} />
                            {job.company.name}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {job.city}
                        </span>
                    </p>
                </div>
                <p className="ms-auto">
                    {isMyJob ? (
                        <CustomTooltip
                            triggerContent={
                                <Button className="bg-danger hover:bg-danger">
                                    <Trash2 className="size-5" />
                                </Button>
                            }
                            tooltipContent={"Delete this job"}
                        />
                    ) : (
                        displaySaveJob()
                    )}
                </p>
            </CardHeader>
            <CardContent>
                <p className="flex items-center gap-2 mb-4 capitalize">
                    <Badge variant="secondary">{job.job_type}</Badge>
                    <Badge variant="secondary">{job.work_mode}</Badge>
                </p>
                <p className="text-zinc-300 text-sm">
                    {job.description.substring(0, job.description.indexOf("."))}
                    .
                </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <p className="text-xl">
                    <span className="font-bold">
                        {salaryFormatter.format(job.salary)}
                    </span>
                    <span className="text-zinc-500"> / yr</span>
                </p>
                <Button variant="secondary-light" asChild>
                    <Link to={`/job/${job.id}`}>
                        <Eye /> View Details
                    </Link>
                </Button>
            </CardFooter>
            {loadingSavedJob && <TopLoader />}
        </Card>
    );
};

export default JobCard;
