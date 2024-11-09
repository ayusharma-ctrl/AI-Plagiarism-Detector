import React, { useState, ChangeEvent, DragEvent } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, UploadIcon } from "lucide-react"
import { IFileUploadProps } from '@/lib/types'

const FileUpload: React.FC<IFileUploadProps> = (props) => {
    const { file, setFile } = props;
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // method to update the file state
    const handleFile = (file: File) => {
        // already handling this by passing "accept" prop input field
        if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            setFile(file);
            setError(null);
        } else {
            setFile(null);
            setError('Please upload a valid PDF or Word document.');
        }
    }

    // method to handle file upload
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            handleFile(uploadedFile);
        }
    }

    // prevent default html behaviour
    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }

    const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }

    // method to handle drag n drop files
    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e?.dataTransfer?.files?.[0]; // access file
        if (droppedFile) {
            handleFile(droppedFile); // call this method to update file state
        }
    }

    return (
        <div className="w-full mx-auto space-y-4">
            <Label
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed 
                    rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer ${isDragging && 'border-red-500'}`
                }
            >
                <div className="flex flex-col items-center justify-center gap-3 py-5 text-sm text-gray-500">
                    <UploadIcon className="w-4 h-4 md:w-10 md:h-10 text-gray-600" />
                    {file ? (
                        <p className="font-semibold">Click to upload a different file</p>
                    ) : (
                        <>
                            <p><span className="font-bold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs">PDF or Word documents only</p>
                        </>
                    )}
                </div>
                <Input
                    type="file"
                    className="hidden"
                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                />
            </Label>

            {/* error handling */}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* file handling */}
            {file && (
                <Alert>
                    <AlertTitle>File Uploaded</AlertTitle>
                    <AlertDescription>{file.name}</AlertDescription>
                </Alert>
            )}

        </div>
    )
}

export default FileUpload;