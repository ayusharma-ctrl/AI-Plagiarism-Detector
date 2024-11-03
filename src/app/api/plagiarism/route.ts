import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import PDFParser from "pdf2json";
import mammoth from "mammoth";
import { allowedFileTypes } from '@/lib/utils';

// create instance
const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// POST request to detect plagiarism in a document 
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData(); // access formdata
        const file = formData.get('file') as File | null; // document is stored in 'file' key

        // validation
        if (!file) return NextResponse.json({ success: false, message: "No file uploaded!" }, { status: 400 });

        // validate file type 
        if (!allowedFileTypes.includes(file.type)) return NextResponse.json({ success: false, message: "Invalid file type. Please upload a PDF or Word document." }, { status: 400 });

        const filename = file.name;
        const fileBuffer = await file.arrayBuffer();
        const fileBase64 = Buffer.from(fileBuffer).toString('base64');

        // read text content from file
        const fileContent = await readTextFromFile(fileBase64, filename);

        // validate extracted text
        if (!fileContent) return NextResponse.json({ success: false, message: "Failed to extract text from the file." }, { status: 500 });

        const prompt = `Analyze the following text for plagiarism: "${fileContent}". Identify and highlight any plagiarized sections. Provide a percentage estimate of the overall plagiarism in the text.`;

        const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const resultText = response.text();

        const plagiarismScore = await getPlagiarizedPercentage(resultText); // read score/%age from response

        return NextResponse.json({ success: true, message: resultText, score: plagiarismScore }, { status: 200 });

    } catch (err: unknown) {
        console.error(err);
        return NextResponse.json({ success: false, message: "Unable to process the document!" }, { status: 500 });
    }
}

// read text based on file-type
const readTextFromFile = async (fileBase64: string, filename: string): Promise<string> => {
    try {
        if (filename.toLowerCase().endsWith(".pdf")) {
            return await textFromPdf(fileBase64); // if pdf file, call this method
        } else if (filename.toLowerCase().endsWith(".docx")) {
            return await textFromDocx(fileBase64); // if docx file, call this method
        } else {
            throw new Error("Unsupported file type."); // only above types are supported
        }
    } catch (err) {
        console.log(err);
        throw new Error("Error processing uploaded file");
    }
}

// method to get text from pdf file
const textFromPdf = async (base64Data: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const fileBuffer = Buffer.from(base64Data, "base64");
        const pdfParser = new PDFParser(null, true);

        pdfParser.on("pdfParser_dataReady", () => {
            const parsedText = pdfParser.getRawTextContent();
            resolve(parsedText);
        });

        pdfParser.on("pdfParser_dataError", () => {
            reject(new Error("Failed to parse PDF"));
        });

        pdfParser.parseBuffer(fileBuffer);
    });
}

// method to get text from docx file
const textFromDocx = async (base64Data: string): Promise<string> => {
    try {
        const buffer = Buffer.from(base64Data, "base64");
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
    } catch (error) {
        console.log("Error processing docx file:", error);
        throw new Error("Error processing docx file");
    }
}

// method to read plagiarized percentage from response text
const getPlagiarizedPercentage = async (text: string): Promise<number> => {
    const match = text.match(/(\d+)%/); // regex to read %
    let percentage = 0;
    if (match) {
        percentage = parseInt(match[1], 10);
    }
    return percentage;
}