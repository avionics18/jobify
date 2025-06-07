import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
// components
import ResumesTable from "@/components/custom/ResumesTable";
import { Button } from "@/components/ui/button";
// icons
import { Upload } from "lucide-react";

const MyResumes = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.unsafeMetadata?.role === "recruiter") {
            navigate("/");
        }
    }, [user]);

    return (
        <section className="py-12">
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-bold text-3xl xl:text-5xl tracking-tighter">
                    My Resumes
                </h1>
                <Button size="lg">
                    <Upload />
                    Upload Resume
                </Button>
            </div>
            <div className="table_wrapper bg-slate-900 rounded-xl p-4">
                <ResumesTable />
            </div>
        </section>
    );
};

export default MyResumes;
