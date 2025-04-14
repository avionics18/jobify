import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div>
            <div className="grid-background"></div>
            <main>
                <div className="container">
                    <Header />
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AppLayout;
