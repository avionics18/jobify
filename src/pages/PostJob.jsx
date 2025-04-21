import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

    return (
        <section className="py-12">
            <h1 className="text-3xl">PostJob</h1>
        </section>
    );
};

export default PostJob;
