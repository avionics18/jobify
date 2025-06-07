import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import useFetch from "@/hooks/useFetch";
import { getAllCompanies } from "@/api";
import CompanyComboBox from "@/components/custom/CompanyComboBox";
import SalaryFilter from "@/components/custom/SalaryFilter";
import JobTypeFilter from "@/components/custom/JobTypeFilter";
import WorkModeFilter from "@/components/custom/WorkModeFilter";
import { Button } from "@/components/ui/button";

const SidebarFilters = () => {
    const [isFilterEmpty, setIsFilterEmpty] = useState(true);

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
        <div className="flex flex-col items-stretch gap-4">
            <CompanyComboBox
                loading={loadingCompanies}
                error={errorCompanies}
                companies={companiesData?.map((company) => ({
                    value: company.id,
                    label: company.name,
                }))}
            />
            <SalaryFilter />
            <JobTypeFilter />
            <WorkModeFilter />
            <Button disabled={isFilterEmpty}>Clear All Filters</Button>
        </div>
    );
};

export default SidebarFilters;
