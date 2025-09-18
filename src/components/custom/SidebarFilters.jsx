import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
// hooks
import useFetch from "@/hooks/useFetch";
// api
import { getAllCompanies } from "@/api";
// components
import CompanyComboBox from "@/components/custom/CompanyComboBox";
import SalaryFilter from "@/components/custom/SalaryFilter";
import JobTypeFilter from "@/components/custom/JobTypeFilter";
import WorkModeFilter from "@/components/custom/WorkModeFilter";
import LocationComboBox from "@/components/custom/LocationComboBox";
import { Button } from "@/components/ui/button";

const SidebarFilters = ({ setCity, popoverWidthClass }) => {
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

    const states = [
        {
            value: "1",
            label: "Jharkhand",
        },
        {
            value: "2",
            label: "West Bengal",
        },
        {
            value: "3",
            label: "Hyderabad",
        },
        {
            value: "4",
            label: "Karnataka",
        },
    ];

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
            <LocationComboBox
                locations={states}
                setLocation={setCity}
                placeholderText="Select State"
                labelText="By State"
                popoverWidthClass={popoverWidthClass}
            />
            <SalaryFilter />
            <JobTypeFilter
                labelText="By Job Type"
                labelTextClassName="text-primary"
            />
            <WorkModeFilter
                labelText="By Work Mode"
                labelTextClassName="text-primary"
            />
            <Button disabled={isFilterEmpty}>Clear All Filters</Button>
        </div>
    );
};

export default SidebarFilters;
