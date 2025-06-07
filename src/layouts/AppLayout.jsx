import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from "sonner";
// components
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";

const AppLayout = () => {
    return (
        <>
            <ScrollRestoration />
            <div>
                <div className="grid-background"></div>
                <main className="min-h-screen">
                    <div className="container">
                        <Header />
                        <Outlet />
                    </div>
                </main>
                <Footer />
            </div>
            <Toaster theme="dark" richColors closeButton />
        </>
    );
};

export default AppLayout;
