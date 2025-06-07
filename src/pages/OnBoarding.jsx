import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
// utils
import { cn } from "@/lib/utils";
// components
import { Button } from "@/components/ui/button";
import CompanyDetails from "@/pages/CompanyDetails";
import TopLoader from "@/components/custom/TopLoader";
// icons
import { UserRound, ShieldUser, MoveRight } from "lucide-react";

const OnBoarding = () => {
    const navigate = useNavigate();

    const [userRole, setUserRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [showCompanyForm, setShowCompanyForm] = useState(false);

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
        if (userRole === "candidate") {
            setLoading(true);
            await user
                .update({
                    unsafeMetadata: {
                        role: userRole,
                    },
                })
                .then(() => {
                    setLoading(false);
                    navigate(userRole === "recruiter" ? "/post-job" : "/jobs");
                })
                .catch((err) => {
                    console.error("Error updating role: ", err);
                });
        } else {
            // userRole == "recuiter" then display form to
            // select company or create a new company
            setShowCompanyForm(true);
        }
    };

    const onBackPressHandler = () => {
        setUserRole("");
        setShowCompanyForm(false);
    };

    return (
        <section className="py-12">
            {showCompanyForm ? (
                <CompanyDetails
                    onBackPressHandler={onBackPressHandler}
                    userRole={userRole}
                    loading={loading}
                    setLoading={setLoading}
                />
            ) : (
                <>
                    {loading && <TopLoader />}
                    <p className="text-center text-white/60 mb-3">
                        Welcome aboard!
                    </p>
                    <h1 className="text-center font-bold text-3xl xl:text-5xl tracking-tighter mb-10">
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
                </>
            )}
        </section>
    );
};

export default OnBoarding;
