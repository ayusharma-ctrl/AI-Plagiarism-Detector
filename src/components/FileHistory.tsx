import React, { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Progress } from './ui/progress'
import { IHistoryData, IFileHistoryProps } from '@/lib/types'
import { formattedDate } from '@/lib/utils'
import ReportSave from './ReportSave'

const FileHistory: React.FC<IFileHistoryProps> = (props) => {
    const { historyData } = props;
    const [isShowHistory, setIsShowHistory] = useState<boolean>(false);
    const [selectedHistory, setSelectedHistory] = useState<IHistoryData | null>(null);

    // method to show the selected file history
    const handleShowHistory = (data: IHistoryData) => {
        if (!data) return;
        setSelectedHistory(data);
        setIsShowHistory(true);
    }

    return (
        <div className='my-8'>
            {/* Recent Reports Section - list of previously generated reports */}
            {historyData && (
                <section className='mx-auto max-w-3xl'>
                    <h1 className='text-lg font-semibold'>Recent Reports</h1>
                    <div className='flex flex-wrap justify-start items-center gap-2 lg:gap-4 mt-2 py-4 px-2 rounded-lg bg-gray-200'>
                        {
                            historyData?.length > 0 ? (
                                historyData.map((item, index) =>
                                    <Button key={index} onClick={() => handleShowHistory(item)} variant={'outline'} className={`${selectedHistory?.fileName === item?.fileName && 'border-red-500'}`}>
                                        {item.fileName}
                                    </Button>)
                            ) : (
                                <span className='text-xs font-extralight text-red-500'>Failed to load previously generated reports!</span>
                            )
                        }
                    </div>
                </section>
            )}

            {/* show previous report */}
            {isShowHistory && selectedHistory && (
                <section className='my-4'>
                    <div className='mx-auto max-w-3xl px-6 lg:px-12 space-y-4 lg:space-y-8 my-8 lg:my-12'>
                        <div className='flex justify-between items-end space-x-2'>
                            <h2 className="text-2xl font-bold">Plagiarism Report</h2>
                            <h2 className="text-sm font-normal text-red-500">{formattedDate(selectedHistory?.time)}</h2>
                        </div>
                        {/* file name */}
                        <h2 className="text-xl font-bold">File Name: <span className="text-lg font-normal">{selectedHistory?.fileName}</span></h2>
                        {/* score */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Plagiarism Score</h3>
                            <Progress value={selectedHistory?.score} />
                            <p className="text-sm text-gray-500 dark:text-gray-400">{selectedHistory?.score}% of the content may be plagiarized</p>
                        </div>
                        {/* show report */}
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">Analysis</h3>
                            <Textarea
                                className="min-h-[200px]"
                                placeholder="Plagiarized content will be highlighted here..."
                                readOnly
                                value={selectedHistory?.response}
                            />
                        </div>
                        {/* btn to download report */}
                        <ReportSave fileName={selectedHistory.fileName ?? ''} plagiarismScore={selectedHistory.score ?? 0} plagiarizedText={selectedHistory.response} />
                    </div>
                </section>
            )}
        </div>
    )
}

export default FileHistory;