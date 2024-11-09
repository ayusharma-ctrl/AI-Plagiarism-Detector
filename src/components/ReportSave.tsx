import { toast } from 'sonner';
import { Button } from './ui/button';
import jsPDF from 'jspdf';
import { IReportSaveProps } from '@/lib/types';

const ReportSave: React.FC<IReportSaveProps> = (props) => {
    const { plagiarizedText, plagiarismScore, fileName } = props;

    // method to create a pdf file and download it
    const handleReport = () => {
        try {
            const doc = new jsPDF(); // create doc instance
            const pageHeight = doc.internal.pageSize.getHeight(); // get height of page
            const pageWidth = doc.internal.pageSize.getWidth(); // get width of page
            const margin = 20; // let's give margin 20 for now
            let yPosition = margin; // this is to set top and bottom page margin
            doc.setFont("helvetica"); // set font to "helvetica" for better Unicode support and auto text wrapping

            // custom method to add text with margins and page breaks
            const addText = (text: string, fontSize: number) => {
                doc.setFontSize(fontSize); // method to set fontsize
                const splitText = doc.splitTextToSize(text, pageWidth - 2 * margin); // handles left-right page margins
                for (let i = 0; i < splitText.length; i++) {
                    if (yPosition > pageHeight - margin) {
                        doc.addPage(); // method to adds up a new page if content is large
                        yPosition = margin;
                    }
                    doc.text(splitText[i], margin, yPosition); // method to write text on page
                    yPosition += fontSize * 0.5;
                }
                yPosition += fontSize; // add some space after the text block
            };

            addText(`Plagiarism Report - (${fileName})`, 18); // add title
            addText(`Plagiarism Score: ${plagiarismScore}%`, 16); // add plagiarism score
            addText('Analysis:', 16); // add analysis title
            addText(plagiarizedText, 12); // add plagiarized text

            // doc.text('Analysis:', 20, 50); 
            // Note: normally this is how we directly add text to pdf, accepts (text, x-position, y-position)

            doc.save(`AI-Report-${fileName}.pdf`); // download the PDF file

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