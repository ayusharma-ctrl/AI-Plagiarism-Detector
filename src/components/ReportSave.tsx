import { toast } from 'sonner';
import { Button } from './ui/button';
import jsPDF from 'jspdf';
import { IReportSaveProps } from '@/lib/types';

const ReportSave: React.FC<IReportSaveProps> = (props) => {
    const { plagiarizedText, plagiarismScore, fileName } = props;

    // method to create a pdf file and download it
    const handleReport = () => {
        try {
            const doc = new jsPDF();

            // add title
            doc.setFontSize(18);
            doc.text(`Plagiarism Report - (${fileName})`, 20, 20); // title, position

            // add plagiarism score
            doc.setFontSize(16);
            doc.text(`Plagiarism Score: ${plagiarismScore}%`, 20, 30);

            // add analysis title
            doc.setFontSize(16);
            doc.text('Analysis:', 20, 40);

            // add plagiarized text
            doc.setFontSize(12);
            const splitText = doc.splitTextToSize(plagiarizedText, 170);
            doc.text(splitText, 20, 50);

            // save/download the PDF
            doc.save(`plagiarism_report_${fileName}.pdf`);
            toast.success("PDF report downloaded successfully!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to download report!");
        }
    };

    return (
        <Button className="w-full" disabled={!plagiarizedText} onClick={handleReport}>
            Download Full Report
        </Button>
    )
}

export default ReportSave;