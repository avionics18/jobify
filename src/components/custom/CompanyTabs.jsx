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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyComboBox from "@/components/custom/CompanyComboBox";
import CompanyCreateForm from "@/components/custom/CompanyCreateForm";

const CompanyTabs = ({
    tab,
    tabChangeHandler,
    setCompanyID,
    parentSubmitHandler,
    saveBtnRef,
}) => {
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
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="create-company">
                <CompanyCreateForm
                    saveBtnRef={saveBtnRef}
                    parentSubmitHandler={parentSubmitHandler}
                />
            </TabsContent>
        </Tabs>
    );
};

export default CompanyTabs;
