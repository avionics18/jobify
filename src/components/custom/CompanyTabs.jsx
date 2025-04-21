import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
// api
import { getAllCompanies } from "@/api";
// hooks
import useFetch from "@/hooks/useFetch";
// components
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyComboBox from "@/components/custom/CompanyComboBox";

const CompanyTabs = ({ tab, tabChangeHandler, setCompanyID }) => {
    const { isLoaded } = useUser();

    const {
        fn: fnGetAllCompanies,
        data: companiesData,
        loading: loadingCompanies,
        error: errorCompanies,
    } = useFetch(getAllCompanies);

    useEffect(() => {
        if (isLoaded) {
            fnGetAllCompanies();
        }
    }, [isLoaded]);

    return (
        <Tabs
            defaultValue="select-company"
            value={tab}
            onValueChange={tabChangeHandler}
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="select-company">Select Company</TabsTrigger>
                <TabsTrigger value="create-company">Create Company</TabsTrigger>
            </TabsList>
            <TabsContent value="select-company">
                <Card>
                    <CardHeader>
                        <CardTitle>Select Company</CardTitle>
                        <CardDescription>
                            If your company is already listed, you can select
                            from the dropdown list. Click save changes when
                            you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CompanyComboBox
                            loading={loadingCompanies}
                            error={errorCompanies}
                            companies={companiesData?.map((company) => ({
                                value: company.id,
                                label: company.name,
                            }))}
                            setCompanyID={setCompanyID}
                        />
                        {/* <p className="text-sm text-danger mt-2">
                            Required field - Please select a company.
                        </p> */}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="create-company">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Company</CardTitle>
                        <CardDescription>
                            Register your company to hire the best talent across
                            the globe. After saving, you'll be redirected to
                            dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="font-light" htmlFor="companyName">
                                Company Name
                                <span className="text-danger font-bold">*</span>
                            </Label>
                            <Input id="companyName" type="text" />
                            {/* <p className="text-sm text-danger">
                                Required field
                            </p> */}
                        </div>
                        <div className="space-y-2">
                            <Label className="font-light" htmlFor="companyLogo">
                                Company Logo
                                <span className="text-danger font-bold">*</span>
                            </Label>
                            <Input id="companyLogo" type="text" />
                        </div>
                        <div className="space-y-2">
                            <Label
                                className="font-light"
                                htmlFor="companyWebsite"
                            >
                                Company Website
                            </Label>
                            <Input id="companyWebsite" type="text" />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
};

export default CompanyTabs;
