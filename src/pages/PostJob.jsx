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
// icons
import { Send } from "lucide-react";

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

    // custom
    const [mdContent, setMdContent] = useState("");

    const locations = [
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

    return (
        <section className="py-12">
            <h1 className="font-bold text-3xl xl:text-5xl tracking-tighter mb-10">
                Post Job
            </h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-stretch gap-6 bg-slate-900 border border-slate-700 rounded py-10 px-20"
            >
                <div>
                    <p className="mb-1">
                        <Badge variant="secondary" className="bg-slate-700">
                            Company
                        </Badge>
                    </p>
                    <p className="text-4xl font-bold mb-4">Google</p>
                </div>
                <Input type="text" placeholder="Enter Job Title" />
                <Textarea placeholder="Enter Job Description" />
                <div className="flex items-center gap-4">
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                            {locations.map((location) => (
                                <SelectItem
                                    key={location.value}
                                    value={location.value}
                                >
                                    {location.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="mardown-editor">
                    <p className="text-slate-400 mb-2">
                        Enter Job Requirements
                    </p>
                    <MDEditor
                        value={mdContent}
                        onChange={(content) => setMdContent(content)}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <Button size="xl" className="flex-1">
                        <Send /> Post
                    </Button>
                    <Button
                        variant="secondary-light"
                        size="xl"
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default PostJob;
