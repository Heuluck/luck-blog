import Link from "next/link";
import React from "react";

export default function Header(props: { isFixed?: boolean; style?: React.CSSProperties; className?: string }) {
    const { isFixed = true, style, className } = props;
    return (
        <Link className={`flex flex-col items-center justify-center ${isFixed && `fixed top-20`} ${className}`} href="/blog">
            <header>
                <h1 className="text-4xl font-bold text-center">虚假的新Blog</h1>
                <p className="text-center text-gray-700 mt-2 ml-3 mr-3 xs:scale-75">
                    用Next.js重构了一下下的没什么用的新测试博客
                </p>
            </header>
        </Link>
    );
}
