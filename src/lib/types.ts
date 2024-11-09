export interface IResult {
    success: boolean,
    message: string,
    score?: number,
}

export interface IHistoryData {
    fileName: string,
    response: string,
    score: number,
    time: Date
}

export interface IFileHistoryProps {
    historyData: IHistoryData[] | null
}

export interface IFileUploadProps {
    file: File | null,
    setFile: (file: File | null) => void
}

export interface IReportSaveProps {
    plagiarizedText: string,
    plagiarismScore: number,
    fileName: string,
}