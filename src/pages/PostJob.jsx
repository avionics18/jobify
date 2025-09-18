import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
// components
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import JobTypeFilter from "@/components/custom/JobTypeFilter";
import WorkModeFilter from "@/components/custom/WorkModeFilter";
// icons
import { Send } from "lucide-react";
import LocationComboBox from "@/components/custom/LocationComboBox";

const PostJob = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.unsafeMetadata?.role) {
            navigate(
                user.unsafeMetadata.role === "recruiter" ? "/post-job" : "/"
            );
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted");
    };

    // For Markdown Editor
    const [mdContent, setMdContent] = useState("");

    // States
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);

    const cities = [
        {
            value: "1",
            label: "Bengaluru",
        },
        {
            value: "2",
            label: "Pune",
        },
        {
            value: "3",
            label: "Hyderabad",
        },
        {
            value: "4",
            label: "Delhi",
        },
    ];

    const states = [
        {
            value: "1",
            label: "Jharkhand",
        },
        {
            value: "2",
            label: "West Bengal",
        },
        {
            value: "3",
            label: "Hyderabad",
        },
        {
            value: "4",
            label: "Karnataka",
        },
    ];

    // salary
    return (
        <section className="py-12">
            <h1 className="font-bold text-3xl xl:text-5xl tracking-tighter mb-10">
                Post Job
            </h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-stretch gap-10 bg-slate-900 border border-slate-700 rounded py-10 px-20"
            >
                <div>
                    <p className="mb-1">
                        <Badge variant="secondary" className="bg-slate-700">
                            Company
                        </Badge>
                    </p>
                    <p className="text-4xl font-bold">Google</p>
                </div>
                <Input type="text" placeholder="Enter Job Title" />
                <div className="grid grid-cols-3 gap-10">
                    <div className="col-span-1">
                        <JobTypeFilter
                            labelText="Select Job Type"
                            labelTextClassName="text-slate-400 font-bold mb-4"
                            radioAlignHorizontal={true}
                        />
                    </div>
                    <div className="col-span-1">
                        <WorkModeFilter
                            labelText="Select Work Mode"
                            labelTextClassName="text-slate-400 font-bold mb-4"
                            radioAlignHorizontal={true}
                        />
                    </div>
                    <div className="col-span-1">
                        <p className="text-sm text-slate-400 font-bold mb-4">
                            Enter Expected Salary
                        </p>
                        <Input
                            type="number"
                            placeholder="Enter Expected Salary ₹ (INR)"
                        />
                    </div>
                </div>
                <Textarea placeholder="Enter Job Description" />
                <div className="mardown-editor">
                    <p className="font-bold text-slate-400 mb-2">
                        Enter Job Requirements
                    </p>
                    <MDEditor
                        value={mdContent}
                        onChange={(content) => setMdContent(content)}
                    />
                </div>
                <div className="grid grid-cols-3 gap-10">
                    <div className="col-span-1">
                        <LocationComboBox
                            locations={states}
                            setLocation={setState}
                            placeholderText="Select Country"
                        />
                    </div>
                    <div className="col-span-1">
                        <LocationComboBox
                            locations={states}
                            setLocation={setState}
                            placeholderText="Select State"
                        />
                    </div>
                    <div className="col-span-1">
                        <LocationComboBox
                            locations={cities}
                            setLocation={setCity}
                            placeholderText="Select City"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-10 mt-4">
                    <Button size="lg" className="flex-1 py-6">
                        <Send /> Post
                    </Button>
                    <Button
                        variant="secondary-light"
                        size="lg"
                        className="flex-1 py-6"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default PostJob;
