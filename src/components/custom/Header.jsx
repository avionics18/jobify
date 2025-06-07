import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    SignedIn,
    SignedOut,
    SignIn,
    UserButton,
    useUser,
} from "@clerk/clerk-react";
// components
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
// icons
import {
    LogIn,
    BriefcaseBusiness,
    PenBox,
    Heart,
    FileText,
} from "lucide-react";

const Header = () => {
    const [isSignInVisible, setIsSignInVisible] = useState(false);
    const [search, setSearch] = useSearchParams();

    const { isLoaded, user } = useUser();

    useEffect(() => {
        // check if search params contains "?sign-in=true"
        // if yes, display the sign in popup
        if (search.get("sign-in") === "true") {
            setIsSignInVisible(true);
            setSearch({});
        }
    }, [search]);

    return (
        <>
            <nav className="flex items-center justify-between bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow py-4 px-6 my-4">
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
                    {isLoaded ? (
                        <>
                            <SignedOut>
                                <Button
                                    className="dark:hover:bg-primary/20 border border-transparent dark:hover:border-primary"
                                    variant="ghost"
                                    asChild
                                >
                                    <Link to="/jobs">Find Jobs</Link>
                                </Button>
                                <Button
                                    onClick={() => setIsSignInVisible(true)}
                                >
                                    <LogIn /> Login
                                </Button>
                            </SignedOut>
                            <SignedIn>
                                <div className="flex items-center gap-4 me-2">
                                    <Button
                                        className="dark:hover:bg-primary/20 border border-transparent dark:hover:border-primary"
                                        variant="ghost"
                                        asChild
                                    >
                                        <Link to="/jobs">Find Jobs</Link>
                                    </Button>
                                </div>
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
                                    {user?.unsafeMetadata?.role ===
                                        "candidate" && (
                                        <UserButton.MenuItems>
                                            <UserButton.Link
                                                label="My Resumes"
                                                labelIcon={
                                                    <FileText size={15} />
                                                }
                                                href="/my-resumes"
                                            />
                                        </UserButton.MenuItems>
                                    )}
                                    <UserButton.MenuItems>
                                        <UserButton.Link
                                            label="My Jobs"
                                            labelIcon={
                                                <BriefcaseBusiness size={15} />
                                            }
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
                        </>
                    ) : (
                        <Skeleton className="w-20 h-9 rounded-xl border border-gray-700" />
                    )}
                </div>
            </nav>

            {/* SignIn Modal Dialog */}
            <Dialog open={isSignInVisible} onOpenChange={setIsSignInVisible}>
                <DialogContent className="w-auto py-10">
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
