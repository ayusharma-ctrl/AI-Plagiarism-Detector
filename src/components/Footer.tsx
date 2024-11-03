import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 items-center h-24 px-4 md:px-6 lg:px-8 border-t bg-gray-800 text-white text-xs lg:text-sm">
            <p className="text-gray-400">© 2024 Don&apos;t get caught. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link className="hover:underline underline-offset-4" href="/">
                    Terms of Service
                </Link>
                <Link className="hover:underline underline-offset-4" href="/">
                    Privacy
                </Link>
            </nav>
        </footer>
    )
}

export default Footer;