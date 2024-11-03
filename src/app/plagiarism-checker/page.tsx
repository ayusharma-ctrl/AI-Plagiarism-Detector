"use client";
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircleIcon } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import ReportSave from '@/components/ReportSave';

interface IResult {
    success: boolean,
    message: string,
    score?: number,
}

const Page = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [plagiarizedText, setPlagiarizedText] = useState<string | null>('');
    const [plagiarismScore, setPlagiarismScore] = useState<number | null>(0);

    // method to send uploaded file to the server to detect plagiarism content
    const handlePlagiarismCheck = async () => {
        if (!file) return; // abort if no file found
        setIsFetching(true); // update state to show loader
        const formData = new FormData(); // instance of form
        formData.append('file', file); // include uploaded file in form-data

        try {
            const response = await fetch('/api/plagiarism', {
                method: 'POST',
                body: formData,
            });

            const result: IResult = await response.json(); // using fetch method, so convert the response

            if (!response.ok) {
                toast.error(result?.message);
                return; // handle case where server doesn't return the expected result
            }

            setPlagiarismScore(result?.score ?? 0);
            setPlagiarizedText(result?.message);
            toast.success("Ta-da! Here is your AI generated report.");
        } catch (err: unknown) {
            console.log("Something went wrong: ", err);
            toast.error("Failed to check plagiarism! Please try again later.");
        } finally {
            setIsFetching(false);
        }
    };

    // clear state
    const handleReset = () => {
        setFile(null);
        setPlagiarismScore(null);
        setPlagiarizedText(null);
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center gap-4 mx-2">
            <section className='w-full max-w-2xl space-y-4 mt-16'>
                <FileUpload file={file} setFile={setFile} />
                <Button className="w-full" onClick={handlePlagiarismCheck} disabled={isFetching || !file}>
                    {isFetching ? <LoaderCircleIcon className='animate-spin' /> : 'Check for Plagiarism'}
                </Button>
                {plagiarizedText &&
                    <Button onClick={handleReset} variant={'outline'} className='w-full border-red-400 font-medium'>Reset</Button>
                }
            </section>

            {plagiarizedText && (
                <section className='w-full max-w-2xl space-y-4 lg:space-y-8 my-8 lg:my-12'>
                    <h2 className="text-2xl font-bold">Plagiarism Report</h2>
                    {/* score */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Plagiarism Score</h3>
                        <Progress value={plagiarismScore} />
                        <p className="text-sm text-gray-500 dark:text-gray-400">{plagiarismScore}% of the content may be plagiarized</p>
                    </div>
                    {/* show report */}
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold">Analysis</h3>
                        <Textarea
                            className="min-h-[200px]"
                            placeholder="Plagiarized content will be highlighted here..."
                            readOnly
                            value={plagiarizedText}
                        />
                    </div>
                    {/* btn to download report */}
                    <ReportSave fileName={file?.name ?? ''} plagiarismScore={plagiarismScore ?? 0} plagiarizedText={plagiarizedText} />
                </section>
            )}
        </div>
    )
}

export default Page;