import { format } from "date-fns";
// components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { Badge } from "@/components/ui/badge";
// icons
import { BadgeCheck, Download, Trash2 } from "lucide-react";

const resumes = [
    {
        fileName: "avinash_final_v2-asdjfb47hbsdfb4",
        uploaded_date: "2025-02-17T18:30:00.000Z",
        status: true,
    },
    {
        fileName: "avinash_2025-asdj848hbsdfb4",
        uploaded_date: "2025-01-06T18:30:00.000Z",
        status: false,
    },
    {
        fileName: "avinash_2024_datascience-asxyzr63567fb4",
        uploaded_date: "2024-11-10T18:30:00.000Z",
        status: false,
    },
    {
        fileName: "avinash_murmu-as048hrb348dfb4",
        uploaded_date: "2023-06-24T18:30:00.000Z",
        status: false,
    },
];

const ResumesTable = () => {
    return (
        <Table>
            <TableHeader className="bg-black py-2">
                <TableRow>
                    <TableHead className="text-slate-400 font-bold">
                        Resume
                    </TableHead>
                    <TableHead className="w-80 text-slate-400 font-bold">
                        Uploaded Date
                    </TableHead>
                    <TableHead className="w-[200px] text-slate-400 font-bold">
                        Status
                    </TableHead>
                    <TableHead className="w-[200px] text-slate-400 font-bold">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {resumes.map((resume) => (
                    <TableRow key={resume.fileName}>
                        <TableCell className="font-medium">
                            {resume.fileName}
                        </TableCell>
                        <TableCell>
                            {format(
                                new Date(resume.uploaded_date),
                                "MMMM dd, yyyy"
                            )}
                        </TableCell>
                        <TableCell>
                            {resume.status ? (
                                <Badge className="bg-green-700 text-sm">
                                    Active
                                </Badge>
                            ) : (
                                <Badge className="text-sm" variant="secondary">
                                    In-active
                                </Badge>
                            )}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                            {!resume.status && (
                                <CustomTooltip
                                    triggerContent={
                                        <Button size="sm" variant="outline">
                                            <BadgeCheck />
                                        </Button>
                                    }
                                    tooltipContent="Set as Active"
                                />
                            )}
                            <CustomTooltip
                                triggerContent={
                                    <Button size="sm" variant="outline">
                                        <Download />
                                    </Button>
                                }
                                tooltipContent="Download"
                            />
                            <CustomTooltip
                                triggerContent={
                                    <Button size="sm" variant="outline">
                                        <Trash2 />
                                    </Button>
                                }
                                tooltipContent="Delete"
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ResumesTable;
