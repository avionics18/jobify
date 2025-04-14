import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import TopLoader from "@/components/custom/TopLoader";
import { UserRound, ShieldUser, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
    const navigate = useNavigate();

    const [userRole, setUserRole] = useState("");
    const [submitUserRole, setsubmitUserRole] = useState(false);
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (user?.unsafeMetadata?.role) {
            navigate(
                user.unsafeMetadata.role === "recruiter" ? "/post-job" : "/jobs"
            );
        }
    }, [user]);

    if (!isLoaded) {
        return <TopLoader />;
    }

    const onSubmitUserRole = async () => {
        setsubmitUserRole(true);
        await user
            .update({
                unsafeMetadata: {
                    role: userRole,
                },
            })
            .then(() => {
                setsubmitUserRole(true);
                navigate(userRole === "recruiter" ? "/post-job" : "/jobs");
            })
            .catch((err) => {
                console.log("Error updating role: ", err);
            });
    };

    return (
        <section className="py-12">
            <h1 className="text-center font-semibold xl:text-4xl tracking-tighter py-4 mb-8">
                Please Select Your Role
            </h1>
            <div className="grid grid-cols-2 gap-8 w-1/2 mx-auto mb-14">
                <Button
                    className={cn(
                        "flex flex-col items-center gap-4 h-full py-8",
                        {
                            "bg-primary hover:bg-primary":
                                userRole === "candidate",
                        }
                    )}
                    variant="secondary"
                    onClick={() => setUserRole("candidate")}
                >
                    <UserRound className="size-16" />
                    <p className="text-xl font-normal">Candidate</p>
                </Button>
                <Button
                    className={cn(
                        "flex flex-col items-center gap-4 h-full py-8",
                        {
                            "bg-primary hover:bg-primary":
                                userRole === "recruiter",
                        }
                    )}
                    variant="secondary"
                    onClick={() => setUserRole("recruiter")}
                >
                    <ShieldUser className="size-16" />
                    <p className="text-xl font-normal">Recruiter</p>
                </Button>
            </div>
            <p className="text-center">
                <Button
                    disabled={userRole === ""}
                    variant={userRole === "" ? "secondary" : "default"}
                    size="lg"
                    onClick={onSubmitUserRole}
                >
                    Continue <MoveRight />
                </Button>
            </p>
            {submitUserRole && <TopLoader />}
        </section>
    );
};

export default OnBoarding;
