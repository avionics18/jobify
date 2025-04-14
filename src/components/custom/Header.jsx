import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    SignedIn,
    SignedOut,
    SignIn,
    UserButton,
    useUser,
} from "@clerk/clerk-react";
import { LogIn, BriefcaseBusiness, PenBox, Heart } from "lucide-react";

const Header = () => {
    const [isSignInVisible, setIsSignInVisible] = useState(false);
    const [search, setSearch] = useSearchParams();

    const { user } = useUser();

    useEffect(() => {
        // check if search params contains "?sign-in=true"
        // if yes, display the sign in modal
        if (search.get("sign-in") === "true") {
            setIsSignInVisible(true);
            setSearch({});
        }
    }, [search]);

    return (
        <>
            <nav className="flex items-center justify-between border-b border-b-primary pt-6 pb-4 mb-4">
                <Link to="/" className="flex items-center gap-4">
                    <img
                        className="w-10"
                        src="jobify_logo.svg"
                        alt="Jobify Logo"
                    />
                    <h1 className="text-primary text-2xl font-extrabold">
                        Jobify
                    </h1>
                </Link>
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <Button onClick={() => setIsSignInVisible(true)}>
                            <LogIn /> Login
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        {/* Add a condition that ony if signedin user is a recruiter */}
                        {user?.unsafeMetadata?.role === "recruiter" && (
                            <Button asChild>
                                <Link to="/post-job">
                                    <PenBox /> Post a Job
                                </Link>
                            </Button>
                        )}
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "avatar-box",
                                },
                            }}
                        >
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label="My Jobs"
                                    labelIcon={<BriefcaseBusiness size={15} />}
                                    href="/my-jobs"
                                />
                            </UserButton.MenuItems>
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label="Saved Jobs"
                                    labelIcon={<Heart size={15} />}
                                    href="/saved-jobs"
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>
                </div>
            </nav>

            {/* SignIn Modal Dialog */}
            <Dialog open={isSignInVisible} onOpenChange={setIsSignInVisible}>
                <DialogContent className="sm:max-w-[425px] pt-10">
                    <SignIn
                        signUpForceRedirectUrl="/onboarding"
                        fallbackRedirectUrl="/onboarding"
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Header;
