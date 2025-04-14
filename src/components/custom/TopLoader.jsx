import { BarLoader } from "react-spinners";

const TopLoader = () => {
    return (
        <div className="fixed top-0 inset-x-0">
            <BarLoader className="mb-4" width="100%" color="var(--primary)" />
        </div>
    );
};

export default TopLoader;
