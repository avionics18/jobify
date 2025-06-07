import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const MyJobs = () => {
    const { state } = useLocation();

    if (state) {
        toast.success(state.message, {
            description: state.description,
        });
    }

    return (
        <section className="py-12">
            <h1 className="font-bold text-3xl xl:text-5xl tracking-tighter mb-10">
                My Jobs
            </h1>
        </section>
    );
};

export default MyJobs;
