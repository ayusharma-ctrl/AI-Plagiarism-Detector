import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { FileTextIcon, ShieldCheckIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 xl:py-48 px-4 md:px-8">
          <div className="flex flex-col items-center space-y-4 lg:space-y-8 text-center">
            <h1 className="font-bold tracking-tighter text-3xl sm:text-4xl md:text-5xl lg:text-6xl/none">
              Real-time AI-Powered Plagiarism Detection
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl transition-colors duration-200 ease-in-out hover:text-gray-400">
              Ensure academic integrity with our cutting-edge <span className="hover:text-red-400">AI plagiarism</span> detection tool. Fast, accurate, and easy
              to use. Powered by <span className="text-blue-400">Gemini AI</span>.
            </p>
            <div className="space-x-4">
              <Link href={"/plagiarism-checker"}>
                <Button>Upload Your Document</Button>
              </Link>
              <Link href={"https://en.wikipedia.org/wiki/Plagiarism"} target="_blank">
                <Button variant={"outline"}>Learn More</Button>
              </Link>
            </div>
          </div>
        </section>
        {/* Key Features Section */}
        <section className="py-12 md:py-24 lg:py-32 px-4 md:px-8 bg-gray-100">
          <h2 className="font-bold tracking-tighter text-3xl sm:text-4xl md:text-5xl text-center mb-12">Key Features</h2>
          {/* Render key features - if more we can use array */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {/* feature 1 */}
            <div className="flex flex-col items-center space-y-4 text-center hover:opacity-60">
              <LightningBoltIcon className="h-12 w-12" />
              <h3 className="text-xl font-bold">Lightning Fast</h3>
              <p className="text-gray-500 dark:text-gray-400">Get results in seconds, not minutes.</p>
            </div>
            {/* feature 2 */}
            <div className="flex flex-col items-center space-y-4 text-center hover:opacity-60">
              <ShieldCheckIcon className="h-12 w-12" />
              <h3 className="text-xl font-bold">Highly Accurate</h3>
              <p className="text-gray-500 dark:text-gray-400">Powered by advanced AI for precise detection.</p>
            </div>
            {/* feature 3 */}
            <div className="flex flex-col items-center space-y-4 text-center hover:opacity-60">
              <FileTextIcon className="h-12 w-12" />
              <h3 className="text-xl font-bold">Detailed Reports</h3>
              <p className="text-gray-500 dark:text-gray-400">Comprehensive analysis with highlighted sections.</p>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
}
