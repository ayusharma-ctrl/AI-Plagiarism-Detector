import Link from 'next/link';
import { Copyleft } from 'lucide-react';

const Header = () => {
    return (
        <header className="px-6 lg:px-8 h-24 flex items-center">
            <Link className="flex items-center justify-center gap-2" href="/">
                <Copyleft className="h-8 w-8 xl:h-12 xl:w-12 spin-in-180 animate-in duration-1000" strokeWidth={1} />
                <span className="text-lg xl:text-3xl font-medium animate-in slide-in-from-right-32 duration-1000">Don&apos;t get caught</span>
            </Link>
        </header>
    )
}

export default Header;