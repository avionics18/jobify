import { Link } from "react-router-dom";
// components
import { Button } from "@/components/ui/button";

const LandingPage = () => {
    return (
        <div className="flex flex-col gap-10 sm:gap-20 py-20 sm:py-32">
            <section className="text-center">
                <h1 className="font-extrabold xl:text-7xl tracking-tighter py-4">
                    Find Your Dream Job and get Hired.
                </h1>
                <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
                    Explore thousands of job listings or find the perfect
                    candidate
                </p>
            </section>
            <div className="flex gap-6 justify-center">
                <Button variant="default" size="xl" asChild>
                    <Link to="/jobs">Find Jobs</Link>
                </Button>
                <Button
                    className="dark:border-white"
                    variant="outline"
                    size="xl"
                    asChild
                >
                    <Link to="/post-job">Post a Job</Link>
                </Button>
            </div>
        </div>
    );
};

export default LandingPage;
