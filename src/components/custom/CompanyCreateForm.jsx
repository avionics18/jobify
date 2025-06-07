import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// components
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// icons
import { CheckCircle } from "lucide-react";

const schema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    logo: z
        .any()
        .refine(
            (file) =>
                file[0] &&
                (file[0].type === "image/png" || file[0].type === "image/jpeg"),
            {
                message: "Only Images are allowed",
            }
        ),
    website: z.string().url(),
});

const CompanyCreateForm = ({ saveBtnRef, parentSubmitHandler }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        const button = saveBtnRef.current;
        const handleClick = () => {
            const submit = handleSubmit(submitHandler);
            submit();
        };

        if (button) {
            button.addEventListener("click", handleClick);
        }

        return () => {
            if (button) button.removeEventListener("click", handleClick);
        };
    }, [saveBtnRef]);

    const submitHandler = async (data) => {
        await parentSubmitHandler(data);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Company</CardTitle>
                <CardDescription>
                    Register your company to hire the best talent across the
                    globe. After saving, you'll be redirected to dashboard.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label className="font-light" htmlFor="companyName">
                            Company Name
                            <span className="text-danger font-bold">*</span>
                        </Label>
                        <Input id="companyName" {...register("name")} />
                        {errors.name && (
                            <p className="text-sm text-danger">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label className="font-light" htmlFor="companyLogo">
                            Company Logo
                            <span className="text-danger font-bold">*</span>
                        </Label>
                        <Input
                            id="companyLogo"
                            className="file:text-primary"
                            type="file"
                            accept="image/*"
                            {...register("logo")}
                        />
                        {errors.logo && (
                            <p className="text-sm text-danger">
                                {errors.logo.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label className="font-light" htmlFor="companyWebsite">
                            Company Website
                        </Label>
                        <Input
                            id="companyWebsite"
                            type="text"
                            {...register("website")}
                        />
                        {errors.website && (
                            <p className="text-sm text-danger">
                                {errors.website.message}
                            </p>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default CompanyCreateForm;
