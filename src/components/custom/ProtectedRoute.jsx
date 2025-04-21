import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import TopLoader from "@/components/custom/TopLoader";

const ProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoaded, user } = useUser();

    const { pathname } = useLocation();

    // Check if clerk is loaded
    if (isLoaded) {
        if (!isSignedIn) {
            // check if user is not signed in
            // redirect him to sign in modal no matter what
            return <Navigate to="/?sign-in=true" />;
        } else if (!user.unsafeMetadata?.role && pathname !== "/onboarding") {
            // since user is signed in implies it will have unsafemetadat property
            // check if user has not accepted any role and is not on /onboarding
            // redirect user to /onboarding
            return <Navigate to="/onboarding" />;
        } else {
            // if everything is fine, show the page
            return children;
        }
    } else {
        // if clerk is not loaded, show TopLoader component
        return <TopLoader />;
    }
};

export default ProtectedRoute;
