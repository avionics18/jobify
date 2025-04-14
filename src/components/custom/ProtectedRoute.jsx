import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoaded, user } = useUser();

    const { pathname } = useLocation();

    // check if user is not sifned it, then redirect him to "/"
    // with sign in modal open
    if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
        return <Navigate to="/?sign-in=true" />;
    }

    // check user role is set, if not redirect him to onboarding
    if (
        user !== undefined &&
        !user?.unsafeMetadata?.role &&
        pathname !== "/onboarding"
    ) {
        return <Navigate to="/onboarding" />;
    }

    return children;
};

export default ProtectedRoute;
