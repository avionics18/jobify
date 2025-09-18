import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
// api
import { addNewCompany, addNewRecruiter } from "@/api";
// hooks
import useFetch from "@/hooks/useFetch";
// components
import { Button } from "@/components/ui/button";
import CompanyTabs from "@/components/custom/CompanyTabs";
import { toast } from "sonner";
import TopLoader from "@/components/custom/TopLoader";

const CompanyDetails = ({
    onBackPressHandler,
    userRole,
    loading,
    setLoading,
}) => {
    const [tab, setTab] = useState("select-company");
    const [companyID, setCompanyID] = useState(null);
    const saveBtnRef = useRef(null);

    const { isLoaded, user } = useUser();

    const navigate = useNavigate();

    const { fn: fnAddNewRecruiter } = useFetch(addNewRecruiter);
    const { fn: fnAddNewCompany, data: companyData } = useFetch(addNewCompany);

    const tabChangeHandler = () => {
        setTab((prev) => {
            if (prev === "select-company") return "create-company";
            else return "select-company";
        });
    };

    const onSubmitHandler = async (createCompanyFormData) => {
        if (isLoaded) {
            if (tab === "select-company") {
                if (companyID === null) {
                    // toast
                    toast.warning("Please select a company", {
                        description: "No company has been selected.",
                    });
                } else {
                    try {
                        setLoading(true);
                        await user.update({
                            unsafeMetadata: {
                                role: userRole,
                            },
                        });
                        await fnAddNewRecruiter({
                            recruiter_id: user.id,
                            company_id: companyID,
                        });
                        navigate("/post-job");
                    } catch (error) {
                        console.error(error);
                        toast.error("Error", {
                            description: error.message,
                        });
                        navigate("/onboarding");
                    } finally {
                        setLoading(false);
                    }
                }
            } else if (tab === "create-company") {
                // create company onSubmitHandler logic
                try {
                    setLoading(true);
                    // 1. Create a new company
                    const res = await fnAddNewCompany({
                        name: createCompanyFormData.name,
                        logo: createCompanyFormData.logo[0],
                        website: createCompanyFormData.website,
                    });
                    const { id } = res[0];
                    // 2. Company has been created successfully
                    // and the recruiter belongs to that new company
                    await fnAddNewRecruiter({
                        recruiter_id: user.id,
                        company_id: id,
                    });
                    // 3. Update the unsafeMetaData role
                    await user.update({
                        unsafeMetadata: {
                            role: userRole,
                        },
                    });
                    navigate("/my-jobs", {
                        state: {
                            message: "Onboarded Successfully",
                            description:
                                "Congratulations! You've been onboarded successfully.",
                        },
                    });
                } catch (error) {
                    console.error(error);
                    toast.error("Error", {
                        description: error.message,
                    });
                    navigate("/onboarding");
                } finally {
                    setLoading(false);
                }
            }
        }
    };

    return (
        <>
            {loading && <TopLoader />}
            <section>
                <h1 className="text-center font-bold text-3xl xl:text-5xl tracking-tighter mb-10">
                    Enter Company Details
                </h1>
                <div className="w-[400px] mx-auto">
                    <CompanyTabs
                        tab={tab}
                        tabChangeHandler={tabChangeHandler}
                        setCompanyID={setCompanyID}
                        parentSubmitHandler={onSubmitHandler}
                        saveBtnRef={saveBtnRef}
                    />
                </div>
                <p className="text-center mt-10">
                    <Button
                        className="me-4"
                        variant="secondary-light"
                        size="lg"
                        onClick={onBackPressHandler}
                    >
                        Back
                    </Button>
                    {tab === "select-company" ? (
                        <Button
                            ref={saveBtnRef}
                            size="lg"
                            onClick={onSubmitHandler}
                            disabled={loading}
                        >
                            Save Changes
                        </Button>
                    ) : (
                        <Button ref={saveBtnRef} size="lg" disabled={loading}>
                            Save Changes
                        </Button>
                    )}
                </p>
            </section>
        </>
    );
};

export default CompanyDetails;
